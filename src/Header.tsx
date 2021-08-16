import React from 'react';
import {useHistory} from "react-router-dom";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import header_img from './assets/header.svg'
import logo_img from './assets/logo.png';
import styles from './Common'

interface Props {
    data?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: (props: Props) => ({
            flexGrow: 1,
        }),
        menuButton: {
            marginRight: theme.spacing(1),
            '&:hover': {
                opacity: '0.8'
            }
        },
        btn_box: {
            display: 'flex',
            width: '30%',
            justifyContent: 'flex-start',
        },
        logo_box: {
            display: 'flex',
            width: '30%',
            justifyContent: 'flex-end',
        },
        title: {
            ...styles.title,
            color: '#FFFFFF',
            fontSize: '30px',
            flexGrow: 1,
        },
        headerBox: {
            display: "block",
            height: 64,
        },
        logo: {
            width: '180px',
        }
    }),
);


export default function Header(props: Props) {
    const history = useHistory()
    const {data = 'LABEL'} = props
    const classes = useStyles(props);
    let styles = {
        drawPaper: {
            background: `url('${header_img}#svgView(preserveAspectRatio(none))') center center no-repeat`,
            backgroundSize: "100% 100%",
        },
    }
    return (
        <div className={classes.headerBox}>
            <AppBar className={classes.root} style={styles.drawPaper}>
                <Toolbar>
                    <div className={classes.btn_box}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                onClick={() => {
                                    history.push('/')
                                }}>
                        <HomeIcon/>
                    </IconButton>
                    </div>
                    <Typography className={classes.title}>
                        {data}
                    </Typography>
                    <div className={classes.logo_box}>
                        <img src={logo_img} alt="Hiwonder" className={classes.logo}/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

