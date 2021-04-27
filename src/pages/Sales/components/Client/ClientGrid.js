import React, { Suspense } from 'react';
import {
    Button, 
    Collapse,
    Grid,
    makeStyles
} from '@material-ui/core';
import GeneralInfo from './GeneralInfo';
import AdvancedInfo from './AdvancedInfo';
import ProgramInfo from './ProgramInfo';
import BillingPartsInfo from './BillingPartsInfo';
import Attachments from './Attachments';

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
    const [ selectedView, setSelectedView ] = React.useState(null);

    const changeView = (view) => { setSelectedView(view) }

    const handleClientView = ( ) => {
        props.handleClientView();
        changeView(null);
    }

    return (
        <Grid direction="column" className={classes.root}>
            <Collapse in={selectedView === null}>
                <GeneralInfo 
                    address={props.client.address} 
                    contacts={props.client.contacts}
                    changeView={changeView}/>
            </Collapse>

            <Collapse in={selectedView === 0}>
                <AdvancedInfo advInfo={props.client.advInfo} changeView={changeView}/>
            </Collapse>

            <Collapse in={selectedView === 1}>
                <ProgramInfo programInfo={props.client.programInfo} changeView={changeView}/>
            </Collapse>

            <Collapse in={selectedView === 2}>
                <BillingPartsInfo parts={props.client.parts} changeView={changeView}/>
            </Collapse>

            <Collapse in={selectedView === 3}>
                <Attachments changeView={changeView}/>
            </Collapse>

            <Grid container direction="row" justify="center" alignItems="center">
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleClientView} 
                    className={classes.collapseButton}>
                    Collapse
                </Button>
            </Grid>
        </Grid>
    );
}

export default ClientGrid;