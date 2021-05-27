import React, { useEffect } from 'react';
import { 
    Collapse,
    Divider,
    Grid, 
    List, 
    ListItem, 
    ListItemText, 
    makeStyles,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { getPotentialClients, selectAllClients } from 'features/client/clientsSlice';
import { selectedClientId, setSelectedClientId } from 'features/client/clientsSlice';
import { resetState } from 'features/client/clientsSlice';
import MenuButton from '../../../../components/MenuButton';
import ClientGrid from './ClientGrid';
import Progress from 'components/Progress';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#FFFFFF",
        border: 3,
        borderColor: "#FFFFFF",
        borderRadius: 5,
        borderStyle: "solid",
        padding: 0
    },
    text1: {
        margin: 10
    },
    clientList: {
        padding: 0
    },
    collapseButton: {
        height: 45,
        margin: 20
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        margin: 20
    },
    progress: {
        display: 'flex',
        margin: 20
    }
});

function ClientList( ) {
    // Hooks
    const dispatch = useDispatch();
    const classes = useStyles();
    const [ tabValue, setTabValue ] = React.useState(0);
    const [ showTabs, setShowTabs ] = React.useState(true);
    const [ show, setShow ] = React.useState(true);

    useEffect(( ) => {
        const timeout = setTimeout(( ) => {
            setShow(false);
        }, 1500);

        return ( ) => clearTimeout(timeout);
    }, [ ]);

    // Redux Data
    const clientStatus = useSelector(state => state.clients.status);
    const clients = useSelector(selectAllClients);
    
    useEffect(async ( ) => {
        if (clientStatus === 'idle') {
            dispatch(getPotentialClients( ));
        }
    }, [ clientStatus, dispatch ]);

    const handleTabChange = (event, newValue) => { setTabValue(newValue) }

    const ClientList = ({ clients }) => {
        const [ pageNum, setPageNum ] = React.useState(1);
        const [ viewableClients, setViewableClients ] = React.useState(clients.slice(0, 15));

        // Redux
        const clientId = useSelector(selectedClientId);

        const handlePageChange = (event, value) => { 
            setPageNum(value);
            setViewableClients(clients.slice((value - 1) * 16, (value * 16) - 1));
            window.scrollTo(0, 0);
        }

        if (clientId === null) {
            setShowTabs(true);

            return (
                <Collapse in={clientId === null}>
                    <List className={classes.clientList}>
                        {viewableClients.map((client, index) => (
                            <>
                            <ListItem key={index}>
                                <Divider/>

                                <ListItemText>{client.clnnme} - {client.fstnme} {client.lstnme}</ListItemText>

                                <MenuButton
                                    menuItems={[
                                        "View", 
                                        "Message Sales Rep.",
                                        "Approve",
                                        "Decline",
                                        "Export",
                                        "Cancel"
                                    ]}
                                    menuFunctions={[
                                        ( ) => dispatch(setSelectedClientId(client.id)),
                                        null,
                                        null,
                                        null,
                                        null,
                                        null
                                    ]}
                                    index={index}
                                    actionComp="button"/>
                            </ListItem>

                            <Divider/>

                            </>
                        ))}

                        <Pagination 
                            page={pageNum}
                            count={parseInt(clients.length / 15) + 1} 
                            shape="rounded"
                            onChange={handlePageChange}
                            className={classes.pagination}/>
                    </List>
                </Collapse>
            );
        } else {
            setShowTabs(false);

            return (
                <ClientGrid 
                    client={clients.find(client => client.id === clientId)}
                    clientId={clientId} 
                    hideClient={( ) => dispatch(resetState( ))}/>
            );
        }
    }

    return (
        <Grid container className={classes.root} direction="column">       
            <Collapse in={showTabs}>
                <Grid container direction="row" alignItems="center" justify="center">
                    <Typography>
                    </Typography>
                    <Typography variant="h4" align="center" className={classes.text1}>
                        Client List
                    </Typography>
                </Grid>

                <Divider/>

                <Tabs centered value={tabValue} indicatorColor="secondary" onChange={handleTabChange}> 
                    <Tab label="Potential"/>
                    <Tab label="Queued"/>
                    <Tab label="Approved"/>
                    <Tab label="Active"/>
                </Tabs>

                <Divider/>
            </Collapse>

            { show === true && <Progress/>}
            
            { tabValue === 0 && show === false && <ClientList clients={clients.potential}/> }
        </Grid>
    );
}

export default ClientList;