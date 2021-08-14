import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { Portal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
    paper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
}));

function Popup({ open, close, children }) {
    const classes = useStyles();

    if (!open) return null;
    return (
        <Portal container={document.querySelector('body')}>
            <Backdrop
                className={classes.backdrop}
                open={open}
                onClick={() => {
                    close();
                }}
            >
                <div
                    className={classes.paper}
                    onClick={(e) => e.stopPropagation()}
                >
                    <IconButton
                        className={classes.closeButton}
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={close}
                    >
                        <CloseIcon />
                    </IconButton>
                    {children}
                </div>
            </Backdrop>
        </Portal>
    );
}

export default Popup;
