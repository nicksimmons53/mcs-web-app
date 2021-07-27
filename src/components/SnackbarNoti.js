import React from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

function SnackbarNoti({ open, close, children }) {
    const handleClose = (event, reason) => {
        if (event === 'clickaway') {
            return;
        }

        close(false);
    }

    return (
        <Snackbar open={open} onClose={handleClose}>
            <Alert variant="filled" onClose={handleClose} severity="success">
                {children}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarNoti;