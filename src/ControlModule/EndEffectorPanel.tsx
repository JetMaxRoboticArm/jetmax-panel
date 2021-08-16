import React from 'react';
import {withStyles, makeStyles, MuiThemeProvider, createTheme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SuckerControlPanel from "./SuckerControlPanel";
import styles from './styles'

const theme = createTheme(
    {
        overrides: {
            MuiTab: {
                wrapper: {
                    transform: 'skew(45deg)',
                },
            },
        }
    }
)

const AntTabs = withStyles({
    root: {
        position: 'relative',
        height: '26px',
        minHeight: '26px',
        width: '429px',
        margin: '0 auto',
        borderStyle: 'none',
        borderWidth: '0px',
        transform: 'skew(-45deg)',
        padding: '0 0 0 0',
        marginLeft: '35px',

    },
    indicator: {
        backgroundColor: '#1890ff',
        display: "none",
    },
})(Tabs);

const AntTab = withStyles({
    root: {
        padding: '0 0 0 0',
        color: '#FFFFFF',
        backgroundColor: '#000000',
        textTransform: 'none',
        width: '110px',
        fontSize: '13px',
        fontFamily: 'SourceHanSansSC-regular',
        opacity: 1,
        minWidth: 24,
        minHeight: '26px',
        height: '26px',
        '&:hover': {
            color: '#000000',
            backgroundColor: '#757575',
        },
        '&$selected': {
            color: '#000000',
            backgroundColor: '#FFFFFF',
        }
    },
    selected: {
        color: '#FFFFFF',
        backgroundColor: '#000000',
    },

})(Tab);

const useStyles = makeStyles({
    root: {
        ...styles.panel,
        justifyContent: 'center',
    },
    titleLabel: {
        ...styles.title,
        width: '300px',
    },
    tab_panel: {
        width: '429px',
        height: '144px',
        lineHeight: '20px',
        borderRadius: '0px 7px 7px 7px',
        border: 'none',
        borderWidth: '0px',
        padding: '0 0 0 0',
        boxSizing: 'inherit',
        textAlign: 'center',
        margin: "0 auto",
        marginBottom: '10px',
        backgroundColor: 'rgba(255, 255, 255, 100)',
    }
})

interface TabPanelProps {
    className?: string;
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`endeffect-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}


export default function EndEffectorPanel() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <h2 className={classes.titleLabel}>End Effector Control</h2>
            <MuiThemeProvider theme={theme}>
                <AntTabs value={value} onChange={handleChange}>
                    <AntTab label="Suction Cup" style={{marginLeft: '10px'}}/>
                    <AntTab label="Small Gripper"/>
                    <AntTab label="Big Gripper" style={{borderRadius: '0px 10px 0px 0px'}}/>
                </AntTabs>
            </MuiThemeProvider>
            <TabPanel value={value} index={0} className={classes.tab_panel}>
                <SuckerControlPanel/>
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.tab_panel}>
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.tab_panel}>
            </TabPanel>
        </div>
    )
}

