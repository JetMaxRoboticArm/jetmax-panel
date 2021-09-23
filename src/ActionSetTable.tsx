import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import MenuItem from '@material-ui/core/MenuItem'
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Checkbox, FormControlLabel, Menu, Select, TextField} from "@material-ui/core";
import styles from './ControlModule/styles'
import jetmax from "./jetmax_rpc";
import ActionSetNewFile from './ActionSetNewFile'
import RemoveFileDialog from "./ActionSetRemoveFile";
import ComfirmationDialog from './ConfirmationDialog';
import {useTranslation} from 'react-i18next';

interface Data {
    duration: number
    position: number[],
    pwm_servos: number[]
    sucker: number,
}

function createData(
    duration: number,
    position: number[],
    pwm_servos: number[],
    sucker: number,
): Data {
    return {duration, position, pwm_servos, sucker};
}

interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    {id: 'index', numeric: false, disablePadding: true, label: 'editor.table_items.index'},
    {id: 'duration', numeric: false, disablePadding: true, label: 'editor.table_items.duration'},
    {id: 'x', numeric: true, disablePadding: false, label: 'X'},
    {id: 'y', numeric: true, disablePadding: false, label: 'Y'},
    {id: 'z', numeric: true, disablePadding: false, label: 'Z'},
    {id: 'pwm1', numeric: true, disablePadding: false, label: 'PWM1'},
    {id: 'pwm2', numeric: true, disablePadding: false, label: 'PWM2'},
    {id: 'sucker', numeric: true, disablePadding: false, label: 'editor.table_items.sucker'},
];


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '648px',
            display: "flex",
            // margin: "12px 10px 0 14px",
            marginTop: "12px",
            flexDirection: "column" as const,
            flexShrink: 0,
            lineHeight: "20px",
            borderRadius: "9px",
            backgroundColor: "rgba(218, 218, 218, 100)",
            textAlign: "center" as const,
            alignItems: "center" as const,
        },
        paper: {
            margin: "10px 10px 1px 10px",
            borderRadius: '5px 5px 0px 0px',
            width: '97%',
            height: "280px",
        },
        buttons_paper: {
            borderRadius: '0px 0px 5px 5px',
            width: '97%',
            padding: "6px",
            marginBottom: "8px",
        },
        file_paper: {
            borderRadius: '5px',
            width: '97%',
            padding: "6px",
            marginBottom: "8px",
        },
        table: {},
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'auto',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        container: {
            width: '98%',
            margin: '2px 10px 0px 5px',
            height: "98%"
        },
        button: {
            ...styles.button,
        },
        file_button: {
            ...styles.button,
            width: '74px',
        }

    }),
);

function gen_action_set_str(rows: Data[], space: number = 0): string {
    let json = {
        device: "JetMax",
        protocol_version: "1.0",
        mode: "coordinate",
        author: "",
        data: rows
    }
    return JSON.stringify(json, null, space)
}


function collect_data(duration: number): Data {
    let dur = duration
    let sucker = jetmax.status.sucker ? 1 : 0
    return createData(dur, jetmax.status.position, jetmax.status.pwm_servos, sucker)
}

export default function EnhancedTable() {
    const {t} = useTranslation()
    const classes = useStyles();
    const [selected, setSelected] = React.useState<number>(-1);
    const [value, setValue] = React.useState<number>(0)
    const [rows, setRows] = React.useState<Data[]>([]);
    const [duration, setDuration] = React.useState<string>("1")
    const [actionSetFile, setActionSetFile] = React.useState<number>(0)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [newFileDialog, setNewFileDialog] = React.useState<boolean>(false)
    const [removeFileDialog, setRemoveFileDialog] = React.useState<boolean>(false)
    const [autoRepeat, setAutoRepeat] = React.useState<boolean>(false)
    const [showConfirm, setShowConfirm] = React.useState<boolean>(false)


    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        if (id === selected) {
            setSelected(-1)
        } else {
            setSelected(id)
        }
    };

    const isSelected = (id: number) => selected === id

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer className={classes.container}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='small'
                        aria-label="enhanced table"
                        stickyHeader={true}
                    >
                        <TableHead style={{height: "36px"}}>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={'center'}
                                        style={{fontWeight: 'bold', height: '28px', width: '28px'}}
                                    >
                                        {t(headCell.label)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row, index) => {
                                const isItemSelected = isSelected(index);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, index)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" padding="none"
                                                   align="center" style={{width: '30px'}}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center">{row.duration.toFixed(3)}</TableCell>
                                        <TableCell align="center">{row.position[0].toFixed(1)}</TableCell>
                                        <TableCell align="center">{row.position[1].toFixed(1)}</TableCell>
                                        <TableCell align="center">{row.position[2].toFixed(1)}</TableCell>
                                        <TableCell align="center">{row.pwm_servos[0].toFixed(0)}</TableCell>
                                        <TableCell align="center">{row.pwm_servos[1].toFixed(0)}</TableCell>
                                        <TableCell align="center">{row.sucker.toFixed(0)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Paper className={classes.buttons_paper}>
                <div
                    style={{display: "flex", flexGrow: 1, justifyContent: "space-around", flexDirection: "column"}}>
                    <div
                        style={{display: "flex", flexGrow: 1, justifyContent: "space-around", marginBottom: "5px"}}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyItems: "center",
                                width: "158px"
                            }}
                        >
                            <span style={{textAlign: "center", alignItems: "center"}}>{t("editor.duration")}:</span>
                            <TextField
                                id="duration_input"
                                size="small"
                                value={duration}
                                margin={"dense"}
                                inputProps={{min: 0, style: {textAlign: 'center', height: '10px'}}}
                                onChange={(event) => {
                                    let match = event.target.value.match(/[0-9]+\.?[0-9]{0,3}/g)
                                    setDuration(match ? match[0].slice(0, 8) : "")
                                }}
                                onBlur={(event) => {
                                    let match = event.target.value.match(/[0-9]+\.?[0-9]{0,3}/g)
                                    setDuration(parseFloat(match ? match[0].slice(0, 8) : "1").toString())
                                }}
                                style={{width: "80px", marginLeft: "5px", marginRight: "5px"}}
                            />
                            <span>s</span>
                        </div>
                        <Button className={classes.button} onClick={() => {
                            let new_row = collect_data(parseFloat(duration))
                            rows.push(new_row)
                            setSelected(rows.length - 1)
                        }}>{t("editor.add")}</Button>

                        <Button className={classes.button} onClick={() => {
                            let new_row = collect_data(parseFloat(duration))
                            rows.splice(selected, 0, new_row)
                            setValue(Date.now())
                        }}>{t("editor.insert")}</Button>

                        <Button className={classes.button} onClick={() => {
                            let new_row = collect_data(parseFloat(duration))
                            rows.splice(selected, 1, new_row)
                            setValue(Date.now())
                        }}>{t("editor.replace")}</Button>

                        <Button className={classes.button} onClick={() => {
                            rows.splice(selected, 1)
                            if (selected >= rows.length) {
                                setSelected(rows.length - 1)
                            } else {
                                setValue(Date.now())
                            }
                        }}>{t("editor.delete")}</Button>

                    </div>
                    <div style={{display: "flex", flexGrow: 1, justifyContent: "space-around"}}>
                        <FormControlLabel control={<Checkbox checked={autoRepeat} onChange={() => {
                            setAutoRepeat(!autoRepeat)
                        }}/>} label={t("editor.auto_repeat")} style={{width: "153px"}}/>
                        <Button className={classes.button} onClick={() => {
                            jetmax.run_actionset_online(gen_action_set_str(rows), autoRepeat ? 999999 : 1)
                        }}>{t("editor.play")}</Button>
                        <Button className={classes.button} onClick={() => {
                            console.log(selected)
                            if (selected >= 0 && selected < rows.length) {
                                jetmax.run_actionset_online(gen_action_set_str([rows[selected],]), 1)
                            }
                        }}>{t("editor.step")}</Button>
                        <Button className={classes.button} onClick={() => {
                            jetmax.stop_actionset_online()
                        }}>{t("editor.stop")}</Button>
                        <Button className={classes.button} onClick={() => {
                            setShowConfirm(true)
                        }}>{t("editor.clear")}</Button>
                    </div>
                </div>
            </Paper>
            <Paper className={classes.file_paper}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyItems: "center",
                        width: "250px"
                    }}>
                        <span style={{textAlign: "center", alignItems: "center"}}>{t("editor.actionset")}:</span>
                        <Select
                            value={actionSetFile}
                            displayEmpty style={{flexGrow: 1}}
                            onChange={(event) => {
                                setActionSetFile(event.target.value as number)
                            }}>
                            {jetmax.actionset_list.map((value, index, array) => (
                                <MenuItem key={index} value={index}>{value}</MenuItem>))}
                        </Select>
                    </div>
                    <Button className={classes.file_button} onClick={() => {
                        jetmax.read_actionset(jetmax.actionset_list[actionSetFile], (msg) => {
                            if (msg.success) {
                                let data = JSON.parse(msg.message)
                                setRows(data.data as Data[])
                            }
                        })
                    }}>{t("editor.open")}</Button>
                    <Button className={classes.file_button} onClick={() => {
                        let file_name = jetmax.actionset_list[actionSetFile]
                        let data = gen_action_set_str(rows, 2)
                        jetmax.save_actionset(file_name, data, () => {
                            setValue(Date.now())
                        })
                    }}>{t("editor.save")}</Button>
                    <Button className={classes.file_button} onClick={() => {
                        setNewFileDialog(true)
                    }}>{t("editor.new")}</Button>
                    <Button className={classes.file_button} onClick={(event) => {
                        setAnchorEl(event.currentTarget)
                    }}>{t("editor.more")}...</Button>
                    <Menu id='file operation menu'
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={() => {
                              setAnchorEl(null)
                          }}
                    >
                        <MenuItem onClick={() => {
                            setAnchorEl(null)
                            setRemoveFileDialog(true)
                        }
                        }>{t("editor.remove")}</MenuItem>
                        <MenuItem onClick={() => {
                            setAnchorEl(null)
                        }}>{t("editor.download")}</MenuItem>
                        <MenuItem onClick={() => {
                            setAnchorEl(null)
                        }}>{t("editor.upload")}</MenuItem>
                    </Menu>
                </div>
            </Paper>
            <ActionSetNewFile open={newFileDialog}
                              onClose={(file_name, btn) => {
                                  setNewFileDialog(false)
                                  if (btn === 2) {
                                      let data = gen_action_set_str(rows, 2)
                                      jetmax.save_actionset(file_name, data, () => {
                                          setValue(Date.now())
                                          let index = jetmax.actionset_list.indexOf(file_name)
                                          setActionSetFile(index)
                                      })
                                  }
                              }}/>
            <RemoveFileDialog open={removeFileDialog} file_name={jetmax.actionset_list[actionSetFile]}
                              onClose={(btn) => {
                                  setRemoveFileDialog(false)
                                  if (btn === 2) {
                                      let file_name = jetmax.actionset_list[actionSetFile]
                                      console.log(file_name)
                                      jetmax.remove_actionset(file_name, () => {
                                          if (actionSetFile >= jetmax.actionset_list.length) {
                                              setActionSetFile(jetmax.actionset_list.length - 1)
                                          }
                                          setValue(Date.now())
                                      })
                                  }
                              }}/>
            <ComfirmationDialog open={showConfirm} title="Clear" info="Confirm to clear all lines ?" onClose={(btn) => {
                setShowConfirm(false)
                if (btn === 2) {
                    setRows([])
                    setValue(value)
                }
            }}/>
        </div>
    )
}
