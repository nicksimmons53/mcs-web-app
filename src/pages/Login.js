import React from 'react';
import { Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import "@fontsource/comfortaa";
import logo from 'assets/logo_medium.jpeg';
import colors from 'assets/colors';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#EBEDEF",
        height: '100vh',
        left: 0,
        minWidth: "100%",
        padding: 0, 
        position: 'absolute'
    },
    loginArea: {
        backgroundColor: "#FFFFFF",
        border: 'solid',
        borderColor: colors.blue_sapphire,
        borderRadius: 10,
        padding: 25,
        width: '50%'
    },
    button: {
        fontFamily: 'Comfortaa',
        width: '50%'
    }
});

function Login( ) {
    const classes = useStyles( );
    const { loginWithRedirect } = useAuth0();

    return (
        <Grid 
            container 
            direction="column" 
            alignItems="center" 
            justify="center" 
            className={classes.root}>
            <Grid 
                container 
                direction="column" 
                alignItems="center" 
                justify="space-between" 
                className={classes.loginArea}>
                <img src={logo} alt="MC Surfaces, Inc." className={classes.image}/>

                <Typography variant="h2" style={{fontFamily: 'Comfortaa'}}>OneStop</Typography>

                <Divider style={{margin: 20, width: '75%'}}/>

                <Button 
                    color="secondary"
                    size="large"
                    variant="contained"
                    className={classes.button}
                    onClick={( ) => loginWithRedirect( )}>
                    Login
                </Button>
            </Grid>
        </Grid>
    );
}

export default Login;