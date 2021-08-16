import React from 'react';
import './App.css';
import Header from "./Header";
import {CssBaseline, makeStyles} from "@material-ui/core";
import ServoConfigPanel from "./ServoConfig/ServoConfigPanel";
import styles from "./ServoConfig/styles";

const useStyles = makeStyles(
    {
        panel: {
            ...styles.panel,
            flexGrow: 0,
            width: "500px",
            padding: '10px 10px 0 10px',
            margin: "0 auto",
            flexDirection: "column",
            flexShrink: 0,
        },
        root: {
           margin: "0 auto"
        }
    }
)


export default function ServoConfigMode() {
    const classes = useStyles()
    return (
        <div className={`App`}>
            <CssBaseline/>
            <Header data='舵机调试'/>
            <div className={`main_region`}>
                <div className={classes.root}>
                    <div className={classes.panel}>
                        <ServoConfigPanel servo_id={1}/>
                        <ServoConfigPanel servo_id={2}/>
                        <ServoConfigPanel servo_id={3}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

