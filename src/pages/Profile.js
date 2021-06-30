import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import NavBar from 'components/NavBar';
import NavDrawer from 'components/NavDrawer';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#EBEDEF",
        left: 0,
        marginTop: 0,
        minHeight: "100vh",
        minWidth: "100%",
        padding: 0, 
        position: 'absolute'
    }
});

function Profile( ) {
    const classes = useStyles( );
    
    return (
        <Grid className={classes.root}>
            <NavBar/>
            
            <NavDrawer/>
        </Grid>
    )
}

export default Profile;
