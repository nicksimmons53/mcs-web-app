import React from 'react';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import colors from 'assets/colors';

const useStyles = makeStyles({
    root: {
        minHeight: "100vh",
        minWidth: "100%"
    },
    spinner: {
        color: colors.burnt_sienna
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
            <CircularProgress className={classes.spinner} size={100}/>
        </Grid>
    );
}

export default Loading;