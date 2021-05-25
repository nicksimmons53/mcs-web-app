import React, { useEffect } from 'react';
import {
    Button, 
    Collapse,
    Grid,
    IconButton,
    makeStyles,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import GeneralInfo from './GeneralInfo';
import AdvancedInfo from './AdvancedInfo';
import ProgramInfo from './ProgramInfo';
import BillingPartsInfo from './BillingPartsInfo';
import Attachments from './Attachments';
import MenuButton from '../../../../components/MenuButton';

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
    headerText: {
        margin: 10,
        marginBottom: 20,
        textAlign: 'center'
    },
    collapseButton: {
        height: 45,
        margin: 20,
        minWidth: 300
    }
});


function ClientGrid(props) {
    const dispatch = useDispatch( );
    const classes = useStyles();
    const [ selectedView, setSelectedView ] = React.useState(0);
    const [ show, setShow ] = React.useState(true);

    useEffect(( ) => {
        const timeout = setTimeout(( ) => {
            setShow(false);
        }, 1000);

        return ( ) => clearTimeout(timeout);
    }, [ ]);

    const changeView = (view) => { setSelectedView(view) }

    return (
        <Collapse in={show === false}>
            <Grid container direction="column" className={classes.root}>
                <Grid container direction="row" justify="space-between">
                    <Typography></Typography>
                    <Typography variant="h4" className={classes.headerText}>
                        {props.client.clnnme}
                    </Typography>
                    <MenuButton
                        menuItems={[
                            'Message Sales Rep.',
                            'Approve',
                            'Decline',
                            'Export',
                            'Cancel'
                        ]}
                        menuFunctions={[]}
                        actionComp="icon"
                        icon={MenuIcon}/>
                </Grid>

                <Collapse in={selectedView === 0}>
                    <GeneralInfo clientId={props.clientId} changeView={changeView}/>
                </Collapse>
                
                <Collapse in={selectedView === 1}>
                    <AdvancedInfo clientId={props.clientId} changeView={changeView}/>
                </Collapse>

                <Collapse in={selectedView === 2}>
                    <ProgramInfo clientId={props.clientId} changeView={changeView}/>
                </Collapse>

                <Collapse in={selectedView === 3}>
                    <BillingPartsInfo clientId={props.clientId} changeView={changeView}/>
                </Collapse>

                <Collapse in={selectedView === 4}>
                    <Attachments clientId={props.clientId} changeView={changeView}/>
                </Collapse>

                { selectedView === 0 &&
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className={classes.collapseButton}
                            onClick={( ) => {
                                setShow(true);
                                dispatch(props.hideClient( ))
                            }}>
                            Client List
                        </Button>
                    </Grid>
                }
            </Grid>
        </Collapse>
    );
}

export default ClientGrid;