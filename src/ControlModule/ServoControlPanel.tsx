import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Typography} from "@material-ui/core";
import ServoSlider from "./ServoSlider";
import styles from "./styles";
import jetmax from "../jetmax_rpc";
import { useTranslation } from 'react-i18next';

interface ServoControlPanelProps {
    onValueChange?: (axis: string, value: number) => void;
    data?: string;
}

const useStyles = makeStyles({
        root: styles.panel,
        title: styles.title,
        label: styles.label,
        sliderWidget: {
            ...styles.widget,
            width: "86%",
            height: "42px",
            marginBottom: "11px"
        },
    }
);


export default function ServoControlPanel(props: ServoControlPanelProps) {
    const {t} = useTranslation()
    const classes = useStyles(props)
    return (
        <div className={classes.root}>
            <Typography className={`${classes.title}`}>{t("joint_control")}</Typography>
            <div className={classes.sliderWidget}>
                <ServoSlider label="ID:1" onValueChange={(newValue) => {
                    jetmax.set_serial_servo_with_speed(1, newValue, 100)
                }}/>
            </div>
            <div className={classes.sliderWidget}>
                <ServoSlider label="ID:2" onValueChange={(newValue) => {
                    jetmax.set_serial_servo_with_speed(2, newValue, 100)
                }}/>
            </div>
            <div className={classes.sliderWidget}>
                <ServoSlider label="ID:3" onValueChange={(newValue) => {
                    jetmax.set_serial_servo_with_speed(3, newValue, 100)
                }}/>
            </div>
            <Button className={classes.sliderWidget} style={{marginBottom: '10px'}} variant="contained"
                    disableElevation>{t("about_servo_id")}</Button>
        </div>
    )
}

