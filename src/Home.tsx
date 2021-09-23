import React, {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom'
import './App.css';
import Header from "./Header";
import JpgControl from './assets/Control.jpg';
import JpgActionSet from './assets/ActionSet.jpg';
import ModeCard from "./Home/ModeCard";
import {Button, CssBaseline, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import common_styles from './Common';
import cookies from 'js-cookie';
import jetmax from "./jetmax_rpc";
import {useTranslation} from 'react-i18next'


const useStyles = makeStyles({
        homeMainRegion: {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
        },
        modeCardCon: {
            display: 'flex',
        },
        ipInput: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            ...common_styles.button,
            fontSize: '14px',
            width: '120px',
            fontWeight: 'normal',
            fontFamily: common_styles.font_regular,
            margin: '0 0 0 30px',
        },
    }
)


export default function HomePage() {
    const {t, i18n} = useTranslation()
    const classes = useStyles()
    const history = useHistory()
    const count = useRef<number>(0)
    const timer = useRef<any>(null)
    const [value, setValue] = useState(0)
    const [connectDisable, setConnectDisable] = useState<boolean>(false)
    const [hostname, setHostname] = useState<string>(cookies.get("last_host") || window.location.hostname)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHostname(event.target.value);
    };

    function cb() {
        count.current += 1
        if (count.current > 30) {
            setConnectDisable(false)
        } else {
            if (jetmax.connection) {
                setConnectDisable(false)
            } else {
                timer.current = setTimeout(cb, 100)
            }
        }
    }

    return (
        <div className={`App`}>
            <CssBaseline/>
            <Header data='JetMax'/>
            <button
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}>{i18n.language === 'en' ? 'zh' : 'en'}</button>
            <div className={classes.homeMainRegion}>
                <div style={{display: 'block'}}>
                    <div className={classes.modeCardCon}>
                        <ModeCard label={t("remote_control")} image={JpgControl} onClick={(e) => {
                            history.push('/control_mode')
                        }}/>
                        <ModeCard label={t("action_set_editor")} image={JpgActionSet} onClick={(e) => {
                            history.push('/action_set_editor')
                        }}/>
                    </div>
                    <div className={classes.ipInput}>
                        <TextField id="outlined-basic" size="small" label={t("ip_address")} variant="outlined"
                                   value={hostname} onChange={handleChange}/>
                        <Button className={classes.button}
                                variant="outlined"
                                disabled={connectDisable}
                                onClick={() => {
                                    if (jetmax.connection) {
                                        jetmax.ros_client.close()
                                        jetmax.connection = false
                                        setValue(value + 1)
                                    } else {
                                        setConnectDisable(true)
                                        count.current = 0
                                        cb()
                                        cookies.set('last_host', hostname)
                                        jetmax.ros_client.connect("ws://" + hostname + ":9090")
                                    }
                                }}
                        >{t(jetmax.connection ? 'disconnect' : 'connect')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

