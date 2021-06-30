import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import logo from '../../../assets/logo.png';
import LogoutButton from 'components/LogoutButton';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#FFFFFF",
        border: 3,
        borderColor: "#FFFFFF",
        borderStyle: "solid",
        borderRadius: 5,
        marginBottom: 20,
        padding: 10
    },
    image: {
        margin: 10
    },
    h1: {
        margin: 10
    },
    h4: {
        margin: 10
    },
    button: {
        backgroundColor: "#95F2D9",
        margin: 10
    }
});

function Header() {
    const classes = useStyles();

    return (
        <Grid 
            container 
            direction="row"
            alignItems="center"
            justify="space-between" 
            className={classes.root}>
            
            <img src={logo} alt="MC Surfaces, Inc." className={classes.image}/>
            <Typography className={classes.h1} variant="h3">
                MC Surfaces
            </Typography>
            
            <LogoutButton/>
        </Grid>
    );
}

export default Header;