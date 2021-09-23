import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import styles from '../Common'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
        home: {
            position: 'relative',
            width: '220px',
            height: '220px',
            padding: '0',
            backgroundColor: 'white',
        },

        box: {
            width: '100%',
            height: '100%',
            lineHeight: '0',
            fontSize: '0',
            alignItems: 'center',
            transform: 'rotateZ(45deg)',
        },

        spans: {
            position: 'absolute',
            zIndex: 2,
            pointerEvents: 'none',
            transform: 'translate(-50%)',
            textAlign: "center",
            alignItems: "center",
            color: 'rgba(255, 255, 255, 100)',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: 'SourceHanSansSC-bold',
        },
        span_top: {top: '10%', left: '50%'},
        span_bottom: {bottom: '10%', left: '50%'},
        span_right: {top: '45%', right: '1%', textAlign: 'right'},
        span_left: {top: '45%', left: '15%'},
        span_center: {top: '50%', left: '50%', transform: 'translate(-50%, -50%)'},
        center: {
            display: 'inline-block',
            position: 'absolute',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            color: 'white',
            boxSizing: 'border-box',
            transform: 'translate(-50%, -50%)',
            borderColor: styles.button.borderColor
        },
        btn_center: {
            backgroundColor: '#F4CB35',
            width: '32%',
            height: '32%',
            color: 'transparent',
            '&:hover': styles.button_hover
        },
        circle: {
            backgroundColor: '#fff',
            width: '43%',
            height: '43%',
            borderWidth: '4px',
            borderStyle: 'solid',
            boxSizing: 'border-box',
        },
        btn: {
            ...styles.button,
            display: 'inline-block',
            position: 'relative',
            width: '105px',
            height: '105px',
            boxSizing: 'border-box',
            borderStyle: 'solid',
            borderWidth: '5px',
            color: 'transparent',
            '&:hover': styles.button_hover
        },
        btn_top: {borderRadius: '100% 0 0 0', marginTop: '4px'},
        btn_right: {borderRadius: '0px 100% 0 0', marginLeft: '5px', marginRight: '2px'},
        btn_left: {borderRadius: '0 0 0 100%', borderWidth: '5px', marginTop: '5px'},
        btn_bottom: {borderRadius: '0px 0 100% 0', borderWidth: '5px', marginLeft: '5px'}
    }
)
export default function DirectionButton(props: any) {
    const {t} = useTranslation()
    const classes = useStyles()
    const {onResetClicked, ...others} = props
    return (
        <div className={classes.home}>
            <span className={`${classes.spans} ${classes.span_top}`}>Y+</span>
            <span className={`${classes.spans} ${classes.span_right}`}>X+</span>
            <span className={`${classes.spans} ${classes.span_bottom}`}>Y-</span>
            <span className={`${classes.spans} ${classes.span_left}`}>X-</span>
            <span className={`${classes.spans} ${classes.span_center}`}>{t("arm_control.reset")}</span>
            <div className={classes.box}>
                <div>
                    <Button className={`${classes.btn} ${classes.btn_top}`} {...others}>y+</Button>
                    <Button className={`${classes.btn} ${classes.btn_right}`} {...others}>x+</Button>
                </div>
                <div>
                    <Button className={`${classes.btn} ${classes.btn_left}`} {...others}>x-</Button>
                    <Button className={`${classes.btn} ${classes.btn_bottom}`} {...others}>y-</Button>
                </div>
                <span className={`${classes.center} ${classes.circle}`}/>
                <Button className={`${classes.center} ${classes.btn_center}`} onClick={onResetClicked}>Reset</Button>
            </div>
        </div>
    )
}