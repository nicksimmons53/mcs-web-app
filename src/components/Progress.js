import React, { useEffect } from 'react';
import { 
    CircularProgress,
    Grid, 
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        margin: 20
    }
});

function Progress({...props}) {
    const classes = useStyles();
    
    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <CircularProgress/> 
        </Grid>
    );
}

export default Progress;