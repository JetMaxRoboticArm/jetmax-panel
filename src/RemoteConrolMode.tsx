import React, {useState} from 'react';
import './App.css';
import Header from "./Header";
import {CssBaseline} from "@material-ui/core";
import ArmControlPanel from "./ControlModule/ArmControlPanel";
import ServoControlPanel from "./ControlModule/ServoControlPanel";
import EndEffectorPanel from "./ControlModule/EndEffectorPanel";
import './jetmax_rpc'
import CameraViewer from "./ControlModule/CameraViewer";
import MouseControlPanel from "./ControlModule/MouseControlPanel";
import jetmax from "./jetmax_rpc";


export default function RemoteControlMode() {
    let [enableControl, setEnableControl] = useState(true)
    return (
        <div className={`App`}>
            <CssBaseline/>
            <Header data='JetMax Control'/>
            <div className={`main_region`}>
                <div className={`panel_box_left`}>
                    <CameraViewer hostName={jetmax.host_name}/>
                    <MouseControlPanel/>
                </div>
                <div className={`panel_box_right`}>
                    <ArmControlPanel
                        onValueChange={(axis, value) => {
                            if (enableControl) {
                                value = axis[1] === '+' ? value : -value
                                jetmax.set_position_relatively(axis[0], value, 0.05)
                            }
                        }}
                        onResetClicked={(e) => {
                            setEnableControl(false)
                            jetmax.go_home(() => {
                                setEnableControl(true)
                            })
                        }}/>
                    <ServoControlPanel/>
                    <EndEffectorPanel/>
                </div>
            </div>
        </div>
    );
}

