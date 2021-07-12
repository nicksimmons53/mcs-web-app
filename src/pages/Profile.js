import React from 'react';
import { 
    Grid, 
    makeStyles
} from '@material-ui/core';
import colors from 'assets/colors';

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
        marginLeft: 25,
        zIndex: 1
    },
    link: {
        alignItems: "center",
        color: colors.burnt_sienna,
        display: "flex",
        fontWeight: "bold"
    },
    icon: {
        color: colors.burnt_sienna,
        height: 30,
        marginRight: theme.spacing(0.5),
        width: 30
    }
}));

function Profile( ) {
    const classes = useStyles( );

    return (
        <Grid className={classes.content}>
            <div className={classes.toolbar}>
            </div>
        </Grid>
    )
}

export default Profile;
