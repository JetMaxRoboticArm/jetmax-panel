import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


interface Props {
    open: boolean,
    onClose: (file_name: string, btn: number) => void,
}

export default function NewFileDialog(props: Props) {
    const {open, onClose} = props
    let file_name = useRef<TextFieldProps>(null)
    return <div>
        <Dialog open={open} onClose={() => {
            onClose(file_name.current as string, 0)
        }} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Input file name to create a new actionset file.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="file name of new actionset"
                    label="File Name"
                    type="text"
                    fullWidth
                    inputRef={file_name}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    onClose('', 1)
                }} color="primary">CANCEL</Button>
                <Button onClick={() => {
                    onClose(file_name.current ? file_name.current.value as string : '', 2)
                }} color="primary">OK</Button>
            </DialogActions>
        </Dialog>
    </div>;
}
