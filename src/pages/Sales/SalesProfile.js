import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import NavBar from 'components/NavBar';
import ClientList from './components/Client/ClientList';
import NavDrawer from 'components/NavDrawer';

const useStyles = makeStyles({
    profile: {
        flex: 1
    }
});

function SalesProfile() {
    const classes = useStyles();

    return (
        <Grid container direction="row">
            <NavDrawer/>
            
            <Grid container direction="column" className={classes.profile}>
                <NavBar/>

                <ClientList/>
            </Grid>
        </Grid>
    );
}

export default SalesProfile;