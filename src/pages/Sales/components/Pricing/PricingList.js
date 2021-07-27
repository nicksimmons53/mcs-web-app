import React from 'react';
import { 
    Divider,
    Grid, 
    IconButton,
    makeStyles,
    Typography
} from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#FFFFFF",
        border: 3,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        borderStyle: "solid",
        display: 'flex',
        flex: 1,
        padding: 10,
        height: '55vh',
        margin: 25,
    }
});

function PricingList( ) {
    const classes = useStyles( );
    const [ expand, setExpand ] = React.useState(false);

    return (
        <Grid
            container 
            className={expand ? classes.expandedRoot : classes.root} 
            direction="column">
            <Grid container direction="row" alignItems="center" justify="space-between">
                <Typography variant="h4" className={classes.text1}>
                    In-House Pricing List
                </Typography>

                <IconButton onClick={( ) => setExpand(!expand)}>
                    { expand ? 
                        <FullscreenExitIcon color="secondary" fontSize="large"/>
                        :
                        <FullscreenIcon color="secondary" fontSize="large"/>
                    }
                </IconButton>
            </Grid>

            <Divider/>
        </Grid>
    )
}

export default PricingList;