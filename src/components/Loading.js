import React from 'react';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minHeight: "100vh",
        minWidth: "100%"
    }
})

function Loading() {
    const classes = useStyles( );

    return (
        <Grid 
            container
            alignItems="center"
            justify="center"
            className={classes.root}>
            <CircularProgress color="secondary" size={100}/>
        </Grid>
    );
}

export default Loading;