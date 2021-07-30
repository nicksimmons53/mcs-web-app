import React, { useEffect } from 'react';
import { 
    Divider,
    Grid, 
    List, 
    ListItem, 
    ListItemText,
    makeStyles
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import '@fontsource/montserrat';
import { useSelector, useDispatch } from 'react-redux';
import { getPotentialClients, selectAllClients } from 'features/client/clientsSlice';
import { selectedClientId, setSelectedClientId } from 'features/client/clientsSlice';
import { resetState } from 'features/client/clientsSlice';
import clientAPI from 'api/clientAPI';
import MenuButton from 'components/MenuButton';
import ClientGrid from './ClientGrid';
import TabMenu from 'components/TabMenu';

const useStyles = makeStyles({
    root: {
        height: 500
    },
    expandedRoot: {
        height: 940
    },
    list: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        overflowY: 'scroll'
    },
    clientName: {
        flex: 1,
        fontFamily: 'Montserrat',
        fontSize: 18
    },
    text2: {
        flex: 1,
        fontFamily: 'Montserrat'
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

function ClientList( props ) {
    // Hooks
    const dispatch = useDispatch();
    const classes = useStyles();
    const tabs = ["Potential", "Queued", "Approved", "Active"];
    const [ tabValue, setTabValue ] = React.useState(0);
    const [ pageNum, setPageNum ] = React.useState(1);

    // Redux Data
    const clientStatus = useSelector(state => state.clients.status);
    const clients = useSelector(selectAllClients);
    const clientId = useSelector(selectedClientId);
    
    useEffect(( ) => {
        if (clientStatus === 'idle') {
            dispatch(getPotentialClients( ));
        }
    }, [ clientStatus, dispatch ]);

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

    const handlePageChange = (event, value) => { 
        setPageNum(value);
        window.scrollTo(0, 0);
    }
    
    const ClientListItem = ({ ...props }) => {
        const menu = {
            Potential: {
                labels: ["View", "Message Sales Rep.", "Export", "Cancel"],
                functions: [
                    ( ) => dispatch(setSelectedClientId(props.client.id)),
                    null,
                    ( ) => exportClient(props.client.id, props.client.clnnme),
                    null
                ]
            },
            Queued: {
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
            Approved: {
                labels: ["View", "Message Sales Rep.", "Export", "Cancel"],
                functions: [
                    ( ) => dispatch(setSelectedClientId(props.client.id)),
                    null,
                    ( ) => exportClient(props.client.id, props.client.clnnme),
                    null
                ]
            },
            Active: {
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
            <ListItem divider>
                <ListItemText 
                    disableTypography 
                    className={classes.clientName}>
                        {props.client.clnnme}
                </ListItemText>

                <ListItemText 
                    disableTypography 
                    className={classes.text2}>
                        {props.client.fstnme} {props.client.lstnme}
                </ListItemText>
            
                <MenuButton
                    menuItems={menu[props.type].labels}
                    menuFunctions={menu[props.type].functions}
                    index={props.key}
                    actionComp="button"/>
            </ListItem>
        );
    }

    const Clients = (props) => {
        let page = props.page;
        const [ clients, setClients ] = React.useState(props.clients.slice((page - 1) * 16, (page * 16) -1));
        
        return (
            <List className={classes.list}>
                {clients.map((client, index) => (
                    <ClientListItem client={client} key={index} type={props.type}/>
                ))}
            </List>
        )
    }
        
    if (clientId !== null) {
        return (
            <ClientGrid 
                client={clients[tabs[tabValue].toLowerCase( )].find(client => client.id === clientId)}
                clientId={clientId} 
                type={tabs[tabValue].toLowerCase( )}
                hideClient={( ) => dispatch(resetState( )) }/>
        )
    }

    return clients !== null && (
        <Grid container direction="column" className={props.expand ? classes.expandedRoot : classes.root}>
            <TabMenu tabs={tabs} value={tabValue} setValue={setTabValue}/>

            <Divider/>

            { tabValue === 0 && <Clients clients={clients.potential} type="Potential" page={pageNum}/> }

            { tabValue === 1 && <Clients clients={clients.queued} type="Queued" page={pageNum}/> }

            { tabValue === 2 && <Clients clients={clients.approved} type="Approved" page={pageNum}/> }

            { tabValue === 3 && <Clients clients={clients.active} type="Active" page={pageNum}/> }

            <Divider/>

            <Pagination 
                    page={pageNum}
                    count={parseInt(clients[tabs[tabValue].toLowerCase( )].length / 15) + 1}
                    shape="rounded"
                    className={classes.pagination}
                    onChange={handlePageChange}/>
        </Grid>
    );
}

export default ClientList;