import React, { useEffect } from 'react';
import {
    Card,
    CardHeader,
    Grid,
    makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import { getClientContacts, selectClientContacts } from 'features/client/clientsSlice';
import { getClientAddress, selectClientAddress } from 'features/client/clientsSlice';
import { DataGrid } from '@material-ui/data-grid';
import clientAPI from 'api/clientAPI';
import MenuButton from '../../../../components/MenuButton';
import Progress from 'components/Progress';

const addressColumn = [
    { field: 'location', headerName: 'Addresses', flex: 1 },
    { field: 'addrs1', headerName: 'Street Address', flex: 1 },
    { field: 'addrs2', headerName: 'Street Address 2', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'zip', headerName: 'Zip Code', flex: 1 },
];
const contactColumn = [
    { field: 'name', headerName: 'Name', flex: 1},
    { field: 'title', headerName: 'Title', flex: 1},
    { field: 'phone', headerName: 'Phone', flex: 1},
    { field: 'email', headerName: 'Email', flex: 1},
];

const useStyles = makeStyles({
    card: {
        flex: 1,
        margin: 10
    },
    headerText: {
        margin: 10,
        marginRight: 30,
        padding: 10
    },
    list: {
        flex: 1,
        margin: 10,
        paddingTop: 0
    }, 
    listHeader: {
        backgroundColor: '#1C1F33',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        color: '#FCFCFC'
    },
    root: {
        flex: 1,
        marginRight: 20
    }
});

const GeneralInfo = ({...props}) => {
    const dispatch = useDispatch( );
    const classes = useStyles( );
    const tableColumns = [addressColumn, contactColumn];
    const cards  = ["Advanced Info.", "Program Info.", "Billing Parts", "Attachments"];

    // Redux
    const addressStatus = useSelector(state => state.clients.clientStatus.addresses);
    const contactStatus = useSelector(state => state.clients.clientStatus.contacts);
    const clientAddresses = useSelector(selectClientAddress);
    const clientContacts = useSelector(selectClientContacts);
    
    useEffect(( ) => {
        if (addressStatus === 'idle' && clientAddresses.length === 0) {
            dispatch(getClientAddress(props.clientId));
        }

        if (contactStatus === 'idle' && clientContacts.length === 0) {
            dispatch(getClientContacts(props.clientId));
        }
    }, [ 
        addressStatus, 
        contactStatus, 
        dispatch, 
        props.clientId, 
        clientAddresses.length,
        clientContacts.length
    ]);


    let renderedContent;
    if (addressStatus === 'loading' || contactStatus === 'loading') {
        renderedContent = <Progress/>;
    } else if (addressStatus === 'succeeded' && contactStatus === 'succeeded') {
        renderedContent = [clientAddresses, clientContacts].map((info, index) => (
            <Card raised key={index} style={{marginBottom: 20, marginRight: 20, width: '100%'}}>
                <DataGrid
                    autoHeight
                    rows={info}
                    columns={tableColumns[index]}
                    pageSize={3}/>
            </Card>
        ));
    }

    const exportClient = (id, clientName, index) => {
        let regex = /\s/g;
        let infoSections = ["advInfo", "programs", "billingParts", "files"];
        let client = {
            id: id,
            name: clientName.replace(regex, '_')
        };

        clientAPI.exportInfo(client, {
            basicInfo: true,
            advInfo: infoSections[index] === "advInfo" ? true : false,
            programs: infoSections[index] === "programs" ? true : false,
            billingParts: infoSections[index] === "billingParts" ? true : false,
            files: infoSections[index] === "files" ? true : false
        });
    }

    return (
        <Grid container direction="column" alignItems="center" justify="center">
            {renderedContent}

            <Grid container direction="row" className={classes.root}>
                {cards.map((title, index) => (
                    <Card className={classes.card} key={title}>
                        <CardHeader
                            title={title}
                            action={
                                <MenuButton 
                                    menuItems={['Open', 'Export', 'Cancel']} 
                                    menuFunctions={[
                                        ( ) => props.changeView(index + 1),
                                        ( ) => exportClient(props.clientId, props.clientName, index),
                                        ( ) => props.changeView(null)
                                    ]}
                                    index={index}
                                    icon={MoreVertIcon}
                                    actionComp="icon"/>
                            }/>
                    </Card>
                ))}
            </Grid>
        </Grid>
    );
}

export default GeneralInfo;