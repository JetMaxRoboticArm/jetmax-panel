import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Typography} from "@material-ui/core";
import DirectionPads from './DirectionPads'
import styles from './styles'
import comm_styles from '../Common'
import jetmax from '../jetmax_rpc'
import { useTranslation } from 'react-i18next';

interface Props {
    onValueChange?: (axis: string, value: number) => void;
    onResetClicked?: (event: any) => void;
}

const useStyles = makeStyles({
        root: styles.panel,
        title: {
            ...styles.title,
            width: "300px",
        },
        btn: styles.button,
        label: styles.label,
        labelInSlot: {
            ...styles.labelInSlot,
            marginLeft: "10px",
            marginRight: "10px"
        },

        padsWidget: {
            ...styles.widget,
            height: "250px",
            width: "95%",
            marginBottom: "10px",
            padding: "0 8%"
        },
        zBtnWidget: {
            display: "flex",
            flexGrow: 1,
            height: "100%",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
            flexDirection: "column",
        },
        positionSlot: {
            ...styles.labelSlot,
            flexGrow: 1,
        },
        stepWidget: {
            ...styles.widget,
            marginBottom: "10px",
            height: "24px",
            backgroundColor: "transparent",
            justifyContent: "space-between",
            width: "86%",
        },
        stepButton: {
            height: "24px",
            width: "69px",
            borderRadius: "5px",
            color: "rgba(28, 28, 28, 100)",
            backgroundColor: "rgba(255, 255, 255, 100)",
            fontSize: "15px",
            fontFamily: comm_styles.font_regular,
            '&:hover': {
                backgroundColor: "rgba(180, 180, 180, 1)"
            }
        }
    }
)

export default function ArmControlPanel(props: Props) {
    const {t} = useTranslation()
    const classes = useStyles(props)
    const timerRef = useRef<any>(null)
    const timeStamp = useRef<number>(0)
    const {onValueChange, onResetClicked} = props
    const [step_size, setStepSize] = useState<number>(4)
    const [value, setValue] = useState<number>(0)

    const step_buttons = () => {
        let table = []
        for (let i of [2, 4, 6, 8, 10]) {
            table.push(<Button variant="contained" disableElevation
                               className={`${classes.stepButton}`}
                               disabled={i === step_size} key={i}
                               onClick={() => {
                                   setStepSize(i)
                               }}>{i}mm</Button>)
        }
        return table
    }

    const mouseDownCb = (e: any) => {
        const cb = (e: any) => {
            let axis_name = e.target.innerText.toLowerCase()
            if (onValueChange) {
                onValueChange(axis_name, step_size)
            }
            timerRef.current = setTimeout(() => {
                cb(e)
            }, 50)
        }
        timeStamp.current = e.timeStamp
        timerRef.current = setTimeout(() => {
            cb(e)
        }, 500)
    }

    const mouseUpCb = (e: any) => {
        clearTimeout(timerRef.current)
        clearTimeout(timerRef.current)
        clearTimeout(timerRef.current)
        if (e.timeStamp - timeStamp.current < 400) {
            let axis_name = e.target.innerText.toLowerCase()
            if (onValueChange) {
                onValueChange(axis_name, step_size)
            }
        } else {
        }
    }
    const timer = useRef<any>(null)
    useEffect(() => {
        const timer_cb = () => {
            timer.current = setTimeout(timer_cb, 100)
            setValue(Date.now())
        }
        timer_cb()
    }, [])

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>{t("arm_control.title")}</Typography>
            <div className={classes.padsWidget}>
                <DirectionPads onMouseDown={mouseDownCb} onMouseUp={mouseUpCb} onResetClicked={onResetClicked}/>
                <div className={classes.zBtnWidget}>
                    <Button id='z+' className={classes.btn} variant="contained" disableElevation
                            onMouseDown={mouseDownCb}
                            onMouseUp={mouseUpCb}>Z+
                    </Button>
                    <Button id='z-' className={classes.btn} variant="contained" disableElevation
                            onMouseDown={mouseDownCb}
                            onClick={() => setValue(value)}
                            onMouseUp={mouseUpCb}>Z-
                    </Button>
                </div>
            </div>
            <div className={classes.stepWidget}>
                <span className={classes.label}>{t("arm_control.step")}:</span>
                {step_buttons()}
            </div>
            <div className={classes.stepWidget}>
                <span className={`${classes.label}`}>{t("arm_control.current")}:</span>
                <div className={classes.positionSlot}>
                    <span className={classes.labelInSlot}>X:{jetmax.status.position[0].toFixed(2)}mm</span>
                    <span className={classes.labelInSlot}>Y:{jetmax.status.position[1].toFixed(2)}mm</span>
                    <span className={classes.labelInSlot}>Z:{jetmax.status.position[2].toFixed(2)}mm</span>
                </div>
            </div>
        </div>
    )
}

