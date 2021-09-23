import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import styles from "./styles"
import {Button} from "@material-ui/core";
import StyledSlider from "./StyledSlider";
import jetmax from "../jetmax_rpc";
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles({
    root: {
        height: '50%',
    },
    button: {
        ...styles.button,
        fontWeight: "normal",
        marginRight: "20px",
    },
    angleSlot: {
        ...styles.labelSlot,
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        width: "90px",
    },
    sug: {
        display: "flex",
        margin: "15px 0 15px 0",
        alignItems: "center",
        padding: "0 15px 0 15px",
        justifyContent: "space-between",
    },
    angle: {
        color: "white",
    },
    suckerState: {
        marginLeft: "10px",
        marginRight: "5px"
    }
});


export default function SuckerControlPanel() {
    const {t} = useTranslation()
    const classes = useStyles();
    const [angle, setAngle] = useState<number>(90);
    const [value, setValue] = useState(Date.now())
    const timer = useRef<any>(null)
    useEffect(() => {
        const timer_cb = () => {
            timer.current = setTimeout(timer_cb, 100)
            setValue(Date.now())
        }
        timer_cb()
    }, [])

    return (
        <div style={{display: "block", margin: "10px auto"}}>
            <div className={classes.sug}>
                <label style={{minWidth: "50px", textAlign: "left"}}>{t("end_effector.actions.rotate")}:</label>
                <StyledSlider style={{margin: "0 15px 0 15px"}}
                              min={0}
                              max={180}
                              defaultValue={90}
                              value={angle}
                              step={1}
                              onChange={(event: React.ChangeEvent<{}>, newValue: number | number[]) => {
                                  if (typeof (newValue) == "number") {
                                      setAngle(newValue)
                                      jetmax.set_pwm_servo(1, newValue, 0.05)
                                  }
                              }}
                />
            </div>
            <div className={classes.sug}>
                <label>{t("end_effector.actions.suck")}/{t("end_effector.actions.release")}:</label>
                <Button className={classes.button} onClick={() => {
                    jetmax.set_sucker(true)
                }}>{t("end_effector.actions.suck")}</Button>
                <Button className={classes.button} onClick={() => {
                    jetmax.set_sucker(false)
                    setValue(value)
                }}>{t("end_effector.actions.release")}</Button>
            </div>
            <div className={classes.sug}>
                <div style={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
                    <label> {t("end_effector.status.current_angle")}:</label>
                    <div className={classes.angleSlot}>
                        <span className={classes.angle}>{jetmax.status.pwm_servos[0]}</span>
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
                    <label>{t("end_effector.status.current_state")}: </label>
                    <span className={classes.suckerState}>{t(jetmax.status.sucker ? "end_effector.actions.suck" : "end_effector.actions.release")}</span>
                </div>
            </div>
        </div>
    )
}
