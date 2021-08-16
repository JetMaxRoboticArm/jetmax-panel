import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


interface Props {
    open: boolean,
    file_name: string,
    onClose: (btn: number) => void,
}

export default function RemoveFileDialog(props: Props) {
    const {open, file_name, onClose} = props
    return <div>
        <Dialog open={open} onClose={() => {
            onClose(0)
        }} aria-labelledby="form-dialog-title_1">
            <DialogTitle id="form-dialog-title_1">Remove actionset file</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {`Remove actionset file "${file_name}" from jetmax storage?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    onClose(1)
                }} color="primary">Cancel</Button>
                <Button onClick={() => {
                    onClose(2)
                }} color="primary">Yes</Button>
            </DialogActions>
        </Dialog>
    </div>;
}
