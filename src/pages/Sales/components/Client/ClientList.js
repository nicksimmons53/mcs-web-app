import React, { useEffect } from 'react';
import { 
    Collapse,
    Divider,
    Grid, 
    IconButton, 
    List, 
    ListItem, 
    ListItemText,
    makeStyles,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { useSelector, useDispatch } from 'react-redux';
import { getPotentialClients, selectAllClients } from 'features/client/clientsSlice';
import { selectedClientId, setSelectedClientId } from 'features/client/clientsSlice';
import { resetState } from 'features/client/clientsSlice';
import clientAPI from 'api/clientAPI';
import MenuButton from 'components/MenuButton';
import ClientGrid from './ClientGrid';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#FFFFFF",
        border: 3,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        borderStyle: "solid",
        display: 'flex',
        flex: 2,
        margin: 25,
        padding: 10,
        height: '55vh',
    },
    expandedRoot: {
        backgroundColor: "#FFFFFF",
        border: 3,
        borderColor: "#FFFFFF",
        borderRadius: 5,
        borderStyle: "solid",
        padding: 10,
        height: '100%'
    },
    text1: {
        margin: 10
    },
    clientList: {
        backgroundColor: "#FFFFFF",
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'auto'
    },
    clientName: {
        fontSize: 18,
        fontWeight: 'bold'
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
    const [ expand, setExpand ] = React.useState(false);

    // Redux Data
    const clientStatus = useSelector(state => state.clients.status);
    const clients = useSelector(selectAllClients);
    
    useEffect(( ) => {
        if (clientStatus === 'idle') {
            dispatch(getPotentialClients( ));
        }
    }, [ clientStatus, dispatch ]);

    const handleTabChange = (event, newValue) => { setTabValue(newValue) }

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
    
    const ClientListItem = ({ ...props }) => {
        const menu = {
            potential: {
                labels: ["View", "Message Sales Rep.", "Export", "Cancel"],
                functions: [
                    ( ) => dispatch(setSelectedClientId(props.client.id)),
                    null,
                    ( ) => exportClient(props.client.id, props.client.clnnme),
                    null
                ]
            },
            queued: {
                labels: ["View", "Message Sales Rep.", "Approve", "Decline", "Export", "Cancel"],
                functions: [
                    ( ) => dispatch(setSelectedClientId(props.client.id)),
                    null,
                    null,
                    null,
                    ( ) => exportClient(props.client.id, props.client.clnnme),
                    null
                ]
            },
            approved: {
                labels: ["View", "Message Sales Rep.", "Export", "Cancel"],
                functions: [
                    ( ) => dispatch(setSelectedClientId(props.client.id)),
                    null,
                    ( ) => exportClient(props.client.id, props.client.clnnme),
                    null
                ]
            },
            active: {
                labels: ["View", "Message Sales Rep.", "Export", "Cancel"],
                functions: [
                    ( ) => dispatch(setSelectedClientId(props.client.id)),
                    null,
                    ( ) => exportClient(props.client.id, props.client.clnnme),
                    null
                ]
            },
        };

        return (
            <Grid>
                <ListItem>
                    <Divider/>

                    <Grid container direction="column">
                        <ListItemText disableTypography className={classes.clientName}>{props.client.clnnme}</ListItemText>
                        
                        <ListItemText inset>{props.client.fstnme} {props.client.lstnme}</ListItemText>
                    </Grid>

                    <MenuButton
                        menuItems={menu[props.type].labels}
                        menuFunctions={menu[props.type].functions}
                        index={props.key}
                        actionComp="button"/>
                </ListItem>

                <Divider/>
            </Grid>
        );
    }

    const Clients = ({ ...props }) => {
        const [ pageNum, setPageNum ] = React.useState(1);
        const [ viewableClients, setViewableClients ] = React.useState(props.clients.slice(0, 15));

        // Redux
        const clientId = useSelector(selectedClientId);

        const handlePageChange = (event, value) => { 
            setPageNum(value);
            setViewableClients(props.clients.slice((value - 1) * 16, (value * 16) - 1));
            window.scrollTo(0, 0);
        }

        if (clientId === null) {
            return (
                <>
                <List className={classes.clientList}>
                    {viewableClients.map((client, index) => (
                        <ClientListItem client={client} key={index} type={props.type}/>
                    ))}
                </List>

                { expand === false && <Divider/> }

                <Pagination 
                    page={pageNum}
                    count={parseInt(props.clients.length / 15) + 1} 
                    shape="rounded"
                    onChange={handlePageChange}
                    className={classes.pagination}/>
                </>
            );
        } else {
            setExpand(true);

            return (
                <ClientGrid 
                    client={props.clients.find(client => client.id === clientId)}
                    clientId={clientId} 
                    type={props.type}
                    hideClient={( ) => dispatch(resetState( )) }
                    shrinkView={( ) => setExpand(false)}/>
            );
        }
    }

    return clients !== null && (
        <Grid 
            container 
            className={expand ? classes.expandedRoot : classes.root} 
            direction="column">       
            <Collapse in={true}>
                <Grid container direction="row" alignItems="center" justify="space-between">
                    <Typography variant="h4" className={classes.text1}>
                        Clients
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

                <Tabs centered value={tabValue} indicatorColor="secondary" onChange={handleTabChange}> 
                    <Tab label="Potential"/>
                    <Tab label="Queued"/>
                    <Tab label="Approved"/>
                    <Tab label="Active"/>
                </Tabs>

                <Divider/>
            </Collapse>

            { tabValue === 0 && <Clients type="potential" clients={clients.potential}/> }

            { tabValue === 1 && <Clients type="queued" clients={clients.queued}/> }

            { tabValue === 2 && <Clients type="approved" clients={clients.approved}/> }

            { tabValue === 3 && <Clients type="active" clients={clients.active}/> }
        </Grid>
    );
}

export default ClientList;