import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux';
import { setAuth0User } from "features/user/userSlice";
import NavBar from 'components/NavBar';
import NavDrawer from 'components/NavDrawer';
import Loading from 'components/Loading';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#EBEDEF",
        left: 0,
        marginTop: 0,
        minHeight: "100vh",
        minWidth: "100%",
        padding: 0, 
        position: 'absolute',
        zIndex: 0
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        marginLeft: 375,
        zIndex: 1
    }
}));

function Profile( ) {
    const classes = useStyles( );
    const { user, isAuthenticated, isLoading } = useAuth0( );
    const dispatch = useDispatch( );

    if (isLoading) {
        return <Loading/>;
    } else {
        dispatch(setAuth0User(user));
    }

    return (
        <Grid>
            <Grid className={classes.root}>
                <NavBar/>
                
                <NavDrawer/>
            
                <Grid className={classes.content}>
                    <div className={classes.toolbar}>
                        <Typography variant="h6">Dashboard</Typography>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Profile;
