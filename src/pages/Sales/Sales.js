import React from 'react';
import { 
    Grid, 
    makeStyles,
    Typography
} from '@material-ui/core';
import RBAC from 'components/RBAC';
import ClientList from './components/Client/ClientList';

const useStyles = makeStyles({
    root: {
        padding: 50
    }
})

function Sales( ) {
    const classes = useStyles( );
    let user = JSON.parse(localStorage.getItem("user"));

    return user !== null && (
        <Grid className={classes.root}>
            <RBAC roles={[ ]} user={user}>
                <ClientList/>
            </RBAC>
        </Grid>
    );
}

export default Sales;