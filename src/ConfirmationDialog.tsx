import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


interface Props {
    open: boolean,
    title: string,
    info: string,
    onClose: (btn: number) => void,
}

export default function ConfirmationDialog(props: Props) {
    const {open, title, info, onClose} = props
    return <div>
        <Dialog open={open} onClose={() => {
            onClose(0)
        }}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {info}
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
