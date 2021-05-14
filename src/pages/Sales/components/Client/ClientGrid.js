import React, { Suspense, useEffect } from 'react';
import {
    Button, 
    Collapse,
    Divider,
    Grid,
    makeStyles,
    Modal,
    Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { clearAddress, getClientById, getSelectedClient } from 'features/client/clientsSlice';
import { reducers, getClientAddress, selectClientAddress } from 'features/client/clientsSlice';
import GeneralInfo from './GeneralInfo';
import AdvancedInfo from './AdvancedInfo';
import ProgramInfo from './ProgramInfo';
import BillingPartsInfo from './BillingPartsInfo';

const useStyles = makeStyles({
    root: {
        flex: 1,
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25
    },
    table: {
        margin: 10
    },
    collapseButton: {
        height: 45,
        margin: 20,
        minWidth: 200
    }
});


function ClientGrid(props) {
    const classes = useStyles();
    const dispatch = useDispatch( );
    const [ selectedView, setSelectedView ] = React.useState(null);

    const changeView = (view) => { setSelectedView(view) }

    return (
        <Grid container direction="column" className={classes.root}>
            <Collapse in={selectedView === null}>
                <GeneralInfo clientId={props.clientId} changeView={changeView}/>
            </Collapse>

            <Grid container direction="row" justify="center" alignItems="center">
                <Button 
                    variant="contained" 
                    color="secondary" 
                    className={classes.collapseButton}
                    onClick={( ) => {
                        dispatch(props.hideClient( ));
                    }}>
                    Collapse
                </Button>
            </Grid>
        </Grid>
    );
}

export default ClientGrid;