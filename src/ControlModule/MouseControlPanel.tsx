import React, {useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import mouse_area from "../assets/mouse_area.svg"
import styles from "./styles"
import StyledSlider from "./StyledSlider";
import jetmax from '../jetmax_rpc'

interface Props {
    onRun?: (x: number, y: number, z: number, speed: number) => void;
}

const useStyles = makeStyles({
        title: {
            ...styles.title,
            width: "300px",
        },
        root: {
            ...styles.panel,
            width: "580px",
            height: "420px"
        },
        image: {
            height: "310px",
            width: "410px",
            borderStyle: 'none',
        },
        click_area: {
            width: "560px",
            display: 'flex',
            justifyContent: "space-between",
            //flexDirection: "row",
            //height: "90%",
            padding: '15px 30px',
            backgroundColor: "white",
            borderRadius: "10px",
        }
    }
)

export default function MouseControlPanel(props: Props) {
    const classes = useStyles()
    const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'))
    const pos = useRef<number[]>(jetmax.status.position)
    const [zAxis, setZAXis] = useState<number>(100)
    return (
        <div className={classes.root}>
            <Typography className={classes.title}>Mouse Control</Typography>
            <div className={classes.click_area}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <img src={mouse_area} alt={'mouse_area'} className={classes.image}
                         style={{position: 'absolute'}}/>
                    <canvas id='mouse_control_canvas' ref={canvasRef}
                            width={430}
                            height={320}
                            style={
                                {zIndex: 2, position: "relative"}
                            }
                            onClick={(e) => {
                                const x0 = 40, y0 = 314, x1 = 152, y1 = 248
                                const x = e.nativeEvent.offsetX, y = e.nativeEvent.offsetY
                                const y_on = (y1 - y0) / (x1 - x0) * ((x >= 215 ? (215 - (x - 215)) : x) - x0) + y0
                                const distance = Math.sqrt(Math.pow(x - 215, 2) + Math.pow(y - 211, 2))
                                const in_zone = !(y_on < y || distance < 65 || distance > 205)
                                const cxt = canvasRef.current.getContext('2d')
                                if (cxt && in_zone) {
                                    cxt.clearRect(0, 0, e.currentTarget.width, e.currentTarget.height)
                                    cxt.fillStyle = "#E7611F"
                                    cxt.beginPath()
                                    cxt.arc(x, y, 8, 0, Math.PI * 2, true)
                                    cxt.closePath();
                                    cxt.fill();
                                    jetmax.set_position_with_speed([-(x - 215), (y - 211), zAxis], 100) //100mm/s
                                    if (typeof (zAxis) == "number") {
                                        pos.current = [-(x - 215), (y - 211), zAxis]
                                    }
                                }
                            }}/>
                </div>
                <StyledSlider
                    orientation='vertical'
                    max={220}
                    min={50}
                    defaultValue={90}
                    step={1}
                    value={zAxis}
                    onChange={(event: React.ChangeEvent<{}>, newValue: number | number[]) => {
                        if (typeof (newValue) == "number") {
                            setZAXis(newValue)
                            let p = pos.current
                            p[2] = newValue
                            jetmax.set_position_with_speed(pos.current, 100) // 100mm/s
                            pos.current = p
                        }
                    }}/>
            </div>
        </div>
    )
}

