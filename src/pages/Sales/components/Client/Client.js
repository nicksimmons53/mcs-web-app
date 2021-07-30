import React from 'react';
import { 
    Divider,
    Grid, 
    IconButton,
    makeStyles,
    Typography
} from '@material-ui/core';
import '@fontsource/montserrat';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import ClientList from './ClientList';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#FFFFFF",
        border: 3,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        borderStyle: "solid",
        display: 'flex',
        flexDirection: 'column',
        flex: 2,
        height: '50%',
        margin: 25,
        padding: 10
    },
    expandedRoot: {
        backgroundColor: "#FFFFFF",
        border: 3,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        borderStyle: "solid",
        margin: 25,
        height: '100%',
        padding: 10,
        width: '100%'
    },
    header: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold'
    }
});

function Client( ) {
    // Hooks
    const classes = useStyles();
    const [ expand, setExpand ] = React.useState(false);

    return (
        <Grid container direction="column" className={expand ? classes.expandedRoot : classes.root}>
            <Grid container direction="row" alignItems="center" justify="space-between">
                <Typography variant="h4" className={classes.header}>
                    Clients
                </Typography>

                <IconButton onClick={( ) => setExpand(!expand)}>
                    { expand ? 
                        <FullscreenIcon color="secondary" fontSize="large"/>
                        :
                        <FullscreenExitIcon color="secondary" fontSize="large"/>
                    }
                </IconButton>
            </Grid>

            <Divider/>
            
            <ClientList expand={expand}/>
        </Grid>
    );
}

export default Client;