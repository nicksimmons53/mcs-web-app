import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import logo from '../../../assets/logo.png';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#FFFFFF",
        border: 3,
        borderColor: "#FFFFFF",
        borderStyle: "solid",
        borderRadius: 5,
        marginBottom: 20
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
            justify="space-between" 
            className={classes.root}>

            <Grid container md direction="row" alignItems="center">
                <img src={logo} alt="MC Surfaces, Inc." className={classes.image}/>
                <Typography className={classes.h1} variant="h4">
                    MC Surfaces
                </Typography>
            </Grid>

            <Grid container xs direction="row-reverse" alignItems="center">
            </Grid>
            
        </Grid>
    );
}

export default Header;