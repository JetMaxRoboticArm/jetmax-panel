import {Slider} from '@material-ui/core';
import {withStyles} from "@material-ui/core";

const BoxShadow = '1px 1px 4px 0px rgba(0,0,0,50)'
const StyledSlider = withStyles({
    root: {
        color: '#F99000',
        height: '9px',
    },
    vertical: {
        color: '#F99000',
        width: '9px',
        '& $rail': {
            width: "9px",
        },
        '& $track': {
            width: "9px",
        },
        '& $thumb': {
            marginLeft: -7,
            marginBottom: '-11px',
            '&:after':{
            }
        }
    },
    thumb: {
        height: 23,
        width: 23,
        backgroundColor: '#fff',
        boxShadow: BoxShadow,
        marginTop: -8,
        marginLeft: -7,
        '&:hover, &:focus, &$active': {
            boxShadow: '2px 2px 6px 0px rgba(134, 86, 0, 78)',
            '@media (hover: none)': {
                boxShadow: BoxShadow,
            },
        },

    },
    valueLabel: {
        left: 'calc(-50% + 12px)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    track: {
        height: 9,
        marginTop: 0,
        borderRadius: 5,
    },
    rail: {
        height: 9,
        opacity: 1,
        marginTop: 0,
        borderRadius: 5,
        backgroundColor: '#575757',
    },

})(Slider);

export default StyledSlider;