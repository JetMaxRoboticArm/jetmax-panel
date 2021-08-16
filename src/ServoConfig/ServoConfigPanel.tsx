import React from 'react'
import ServoSlider from "../ControlModule/ServoSlider";
import {Button, makeStyles} from "@material-ui/core";
import styles from "./styles";
import common_styles from "../Common"


const useStyles = makeStyles({
        widget: {
            ...styles.widget,
            width: "100%",
            padding: "20px, 0, 20px, 0",
            marginBottom: "10px",
        },
        button: {
            ...styles.button,
            margin: "10px 10px 0 10px",
            height: "26px",
            fontWeight: "normal",
            fontSize: "14px",
        },
        label: {
            width: "95px",
        },
        p:{
            margin: "5px 0 2px 0",
            fontFamily: common_styles.font_bold,
            fontWeight: "bold",
            fontSize: "16px",
        }
    }
)

interface Props {
    servo_id: number,
}

export default function ServoConfigPanel(props: Props) {
    const classes = useStyles()
    return (
        <div className={classes.widget}>
            <p className={classes.p}>ID:{props.servo_id}</p>
            <ServoSlider label="Position:" classes={{label: classes.label}}/>
            <ServoSlider label="Offset:" classes={{label: classes.label}} value={0} min={-125} max={125}/>
            <div style={{marginBottom: "10px"}}>
                <Button className={classes.button}> Reset </Button>
                <Button className={classes.button}> Read </Button>
                <Button className={classes.button}> Write </Button>
            </div>
        </div>
    )
}