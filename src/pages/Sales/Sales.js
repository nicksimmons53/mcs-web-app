import React from 'react';
import { 
    Grid, 
    makeStyles
} from '@material-ui/core';
import RBAC from 'components/RBAC';
import ClientList from './components/Client/ClientList';
import PricingList from './components/Pricing/PricingList';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        padding: 50
    }
});

function Sales( ) {
    const classes = useStyles( );
    let user = JSON.parse(localStorage.getItem("user"));

    return user !== null && (
        <Grid container direction="row" className={classes.root}>
            <RBAC roles={[ ]} user={user}>
                <ClientList/>
            </RBAC>

            <RBAC roles={[ ]} user={user}>
                <PricingList/>
            </RBAC>
        </Grid>
    );
}

export default Sales;