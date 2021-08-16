import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {},
    image: {
        borderRadius: "10px",
        borderWidth: 0,
        margin: "8px 0 0 8px",
        height: "435px",
        width: "580px",
        webkitUserSelect: "none",
        backgroundColor: "hsl(0, 0%, 25%)",
        pointerEvents: "none",
    }
})

interface Props {
    hostName?: string;
    className?: string
}

export default function CameraViewer(props: Props) {
    const classes = useStyles();
    let {hostName} = props;
    return (
        <div className={classes.root}>
            <img className={classes.image} src={`http://${hostName}:8080/stream?topic=/usb_cam/image_rect_color`}
                 alt={"camera_view"}/>
        </div>
    )
}

