import React from 'react';
import { 
    Grid, 
    makeStyles
} from '@material-ui/core';
import RBAC from 'components/RBAC';
import PricingList from './components/Pricing/PricingList';
import Client from './components/Client/Client';
import Pricing from './components/Pricing/Pricing';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        padding: 25
    }
});

function Sales( ) {
    const classes = useStyles( );
    let user = JSON.parse(localStorage.getItem("user"));

    return user !== null && (
        <Grid container direction="row" className={classes.root}>
            <RBAC roles={[ ]} user={user}>
                <Client/>
            </RBAC>
            <RBAC roles={[ ]} user={user}>
                <Pricing/>
            </RBAC>
        </Grid>
    );
}

export default Sales;