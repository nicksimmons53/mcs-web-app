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
import { clearAddress, getClientAddress, getPotentialClients, selectAllClients, selectClientAddress, getClientById, selectClient, clearSelected } from 'features/client/clientsSlice';
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
        const [ clientIndex, setClientIndex ] = React.useState(null);
        const [ pageNum, setPageNum ] = React.useState(1);
        const [ viewableClients, setViewableClients ] = React.useState(clients.slice(0, 14));

        const retrievedClient = useSelector(selectClient);

        const handlePageChange = (event, value) => { setPageNum(value) }

        const retrieveClient = async (id) => { await dispatch(getClientById(id)) }
        
        return (
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
                                ( ) => retrieveClient(client.id)
                            ]}
                            index={index}
                            actionComp="button"/>
                    </ListItem>
                    
                    { retrievedClient.basicInfo !== null && retrievedClient.basicInfo.id === client.id ?
                        <Collapse in={retrievedClient.basicInfo.id === client.id}>
                            <Divider/>

                            <ClientGrid clientId={retrievedClient.basicInfo.id} hideClient={clearSelected}/>
                        </Collapse>
                        :
                        null
                    }

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
        );
    }

    return (
        <Grid container className={classes.root} direction="column">
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

            { show === true && <Progress/>}
            
            { tabValue === 0 && show === false && <ClientList clients={clients.potential}/> }
        </Grid>
    );
}

export default ClientList;