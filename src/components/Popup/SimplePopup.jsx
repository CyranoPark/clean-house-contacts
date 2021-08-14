import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: 20,
    },
}));

function SimplePopup({
    handleCancel = () => {},
    handleAgree = () => {},
    handleClose = () => {},
    open,
    title,
    description,
}) {
    const classes = useStyles();

    const onClickCancel = async () => {
        await handleCancel();
        handleClose();
    };

    const onClickAgree = async () => {
        await handleAgree();
        handleClose();
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className={classes.dialog}>
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
            </div>
            <DialogActions>
                <Button onClick={onClickCancel}>취소</Button>
                <Button onClick={onClickAgree} autoFocus>
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SimplePopup;
