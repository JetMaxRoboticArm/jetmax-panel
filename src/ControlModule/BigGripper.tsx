import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import styles from "./styles"
import StyledSlider from "./StyledSlider";
import jetmax from "../jetmax_rpc";
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles({
    root: {
        height: '50%',
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


export default function BigGripperControlPanel() {
    const {t} = useTranslation()
    const classes = useStyles();
    const [angle, setAngle] = useState<number>(90);
    const [angle1, setAngle1] = useState<number>(90);
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
                <label style={{minWidth: "60px", textAlign: "left"}}>{t("end_effector.actions.rotate")}:</label>
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
                <label style={{minWidth: "30px", textAlign: "left"}}>{t("end_effector.actions.open")}</label>
                <StyledSlider style={{margin: "0 15px 0 15px"}}
                              min={0}
                              max={180}
                              defaultValue={90}
                              value={angle1}
                              step={1}
                              onChange={(event: React.ChangeEvent<{}>, newValue: number | number[]) => {
                                  if (typeof (newValue) == "number") {
                                      setAngle1(newValue)
                                      jetmax.set_pwm_servo(2, newValue, 0.05)
                                  }
                              }}
                />
                <label style={{minWidth: "30px", textAlign: "right"}}>{t("end_effector.actions.close")}</label>
            </div>
            <div className={classes.sug}>
                <div style={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
                    <label> {"Servo 1"}:</label>
                    <div className={classes.angleSlot}>
                        <span className={classes.angle}>{jetmax.status.pwm_servos[0]}</span>
                    </div>
                </div>

                <div style={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
                    <label>{"Servo 2"}: </label>
                    <div className={classes.angleSlot}>
                        <span className={classes.angle}>{jetmax.status.pwm_servos[1]}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
