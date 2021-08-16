import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import {CssBaseline} from "@material-ui/core";
import Home from './Home';
import RemoteControlMode from "./RemoteConrolMode";
import ActionSetEditor from "./ActionSetEditor";
import ServoConfigMode from "./ServoConfigMode";
import jetmax from "./jetmax_rpc";

function App() {
    useEffect(() => {
        jetmax.ros_client.on('connection', (event: any) => {
            jetmax.set_url(event.srcElement.url)
            jetmax.connection = true
            jetmax.get_actionset_list(() => {
            })
        })
        jetmax.ros_client.on('close', (event: any) => {
            jetmax.connection = false
        })
        jetmax.ros_client.on('error', (error) => {
            console.log(error)
        })
    }, [])

    return (
        <div className={`App`} key="app">
            <CssBaseline/>
            <BrowserRouter>
                <Route path="/" exact
                       component={() => (<Home/>)}/>
                <Route path="/control_mode" exact
                       component={() => (<RemoteControlMode/>)}/>
                <Route path="/action_set_editor" exact
                       component={() => (<ActionSetEditor/>)}/>
                <Route path="/servo_config" exact component={ServoConfigMode}/>
            </BrowserRouter>
        </div>
    )
}

export default App;
