import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Header from './components/Header';
import ClientList from './components/Client/ClientList';

const useStyles = makeStyles({
    root: {
        padding: 25
    },
    profile: {
        flex: 1
    }
});

function SalesProfile() {
    const classes = useStyles();

    return (
        <Grid container direction="row" className={classes.root}>
            <Grid container direction="column" className={classes.profile}>
                <Header/>

                <ClientList/>
            </Grid>
        </Grid>
    );
}

export default SalesProfile;