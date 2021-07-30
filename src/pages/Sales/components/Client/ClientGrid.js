import React, { useEffect } from 'react';
import {
    Button, 
    Collapse,
    Grid,
    IconButton,
    makeStyles,
    Modal,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import "@fontsource/montserrat";
import { useDispatch, useSelector } from 'react-redux';
import { getClientFiles, selectClientFiles } from 'features/client/clientsSlice';
import GeneralInfo from './GeneralInfo';
import AdvancedInfo from './AdvancedInfo';
import ProgramInfo from './ProgramInfo';
import BillingPartsInfo from './BillingPartsInfo';
import Attachments from './Attachments';
import MenuButton from '../../../../components/MenuButton';
import clientAPI from 'api/clientAPI';
import RBAC from 'components/RBAC';

const useStyles = makeStyles({
    collapseButton: {
        height: 45,
        margin: 20,
        minWidth: 300
    },
    headerText: {
        fontFamily: 'Montserrat',
        margin: 10,
        marginBottom: 20,
        textAlign: 'center'
    },
    modal: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25
    },
    table: {
        margin: 10
    }
});


function ClientGrid(props) {
    const dispatch = useDispatch( );
    const classes = useStyles();
    const [ selectedView, setSelectedView ] = React.useState(0);
    const [ show, setShow ] = React.useState(true);
    let user = JSON.parse(localStorage.getItem("user"));
    const menu = {
        potential: {
            labels: ["Message Sales Rep.", "Export", "Cancel"],
            functions: [
                null,
                ( ) => exportClient(props.client.id, props.client.clnnme),
                null
            ]
        },
        queued: {
            labels: ["Message Sales Rep.", "Approve", "Decline", "Export", "Cancel"],
            functions: [
                null,
                null,
                null,
                ( ) => exportClient(props.client.id, props.client.clnnme),
                null
            ]
        },
        approved: {
            labels: ["Message Sales Rep.", "Export", "Cancel"],
            functions: [
                null,
                ( ) => exportClient(props.client.id, props.client.clnnme),
                null
            ]
        },
        active: {
            labels: ["Message Sales Rep.", "Export", "Cancel"],
            functions: [
                null,
                ( ) => exportClient(props.client.id, props.client.clnnme),
                null
            ]
        },
    };

    useEffect(( ) => {
        const timeout = setTimeout(( ) => {
            setShow(false);
        }, 1000);

        return ( ) => clearTimeout(timeout);
    }, [ ]);

    // Redux 
    const fileStatus = useSelector(state => state.clients.clientStatus.files);
    const files = useSelector(selectClientFiles);

    const regex = /\s/g
    const reformattedClientName = props.client.clnnme.replace(regex, '_');
    useEffect(( ) => {
        if (fileStatus === 'idle') {
            dispatch(getClientFiles(reformattedClientName))
        }
    }, [ dispatch, fileStatus, reformattedClientName ]);

    const changeView = (view) => { setSelectedView(view) }

    const exportClient = (id, clientName) => {
        let regex = /\s/g;
        let client = {
            id: id,
            name: clientName.replace(regex, '_')
        };

        clientAPI.exportInfo(client, {
            basicInfo: true,
            advInfo: true,
            programs: true,
            billingParts: true,
            files: true
        });
    }

    return user !== null && (
        <Collapse in={show === false}>
            <Grid container direction="column" className={classes.root}>
                <Grid container direction="row" justify="space-between">
                    <IconButton color="secondary" onClick={( ) => {
                        setShow(true);
                        dispatch(props.hideClient( )); 
                        }}>
                        <ArrowBackIcon fontSize="large"/>
                    </IconButton>
                    <Typography variant="h4" className={classes.headerText}>
                        {props.client.clnnme}
                    </Typography>
                    <MenuButton
                        menuItems={menu[props.type].labels}
                        menuFunctions={menu[props.type].functions}
                        actionComp="icon"
                        icon={MenuIcon}/>
                </Grid>

                <Collapse in={selectedView === 0 || selectedView === 4}>
                    <GeneralInfo 
                        clientId={props.clientId} 
                        clientName={props.client.clnnme}
                        changeView={changeView}/>
                </Collapse>
                
                <Collapse in={selectedView === 1}>
                    <RBAC roles={[ ]} user={user}>
                        <AdvancedInfo clientId={props.clientId} changeView={changeView}/>
                    </RBAC>
                </Collapse>

                <Collapse in={selectedView === 2}>
                    <RBAC roles={[ ]} user={user}>
                        <ProgramInfo clientId={props.clientId} changeView={changeView}/>
                    </RBAC>
                </Collapse>

                <Collapse in={selectedView === 3}>
                    <RBAC roles={[ ]} user={user}>
                        <BillingPartsInfo clientId={props.clientId} changeView={changeView}/>
                    </RBAC>
                </Collapse>
                
                <RBAC roles={[ ]} user={user}>
                    <Modal 
                        open={selectedView === 4} 
                        onClose={( ) => changeView(0)}
                        className={classes.modal}>
                            <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}><Attachments files={files} changeView={changeView}/></div>
                    </Modal>
                </RBAC>

                { selectedView === 0 &&
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className={classes.collapseButton}
                            onClick={( ) => {
                                setShow(true);
                                dispatch(props.hideClient( ));
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