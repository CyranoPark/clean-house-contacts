import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Portal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 5,
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
                    {children}
                </div>
            </Backdrop>
        </Portal>
    );
}

export default Popup;
