import React, { useEffect } from 'react';
import {
    Card,
    CardHeader,
    Grid,
    makeStyles,
    Paper,
    Typography
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import { getClientContacts, selectClientContacts } from 'features/client/clientsSlice';
import { getClientAddress, selectClientAddress } from 'features/client/clientsSlice';
import { DataGrid } from '@material-ui/data-grid';
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
    },
    table: {
        borderWidth: 1,
        borderStyle: 'solid',
        flex: 5,
        marginRight: 20
    }
});

const GeneralInfo = ({...props}) => {
    const dispatch = useDispatch( );
    const classes = useStyles( );
    const [ show, setShow ] = React.useState(true);
    const cards  = ["Advanced Info.", "Program Info.", "Billing Parts", "Attachments"];

    // Redux
    const clientAddresses = useSelector(selectClientAddress);
    const clientContacts = useSelector(selectClientContacts);
    useEffect(( ) => {
        if (clientAddresses.length === 0) {
            dispatch(getClientAddress(props.clientId));
            dispatch(getClientContacts(props.clientId));
        }
    });

    useEffect(( ) => {
        const timeout = setTimeout(( ) => {
            setShow(false);
        }, 1500);

        return ( ) => clearTimeout(timeout);
    }, [ ]);

    if (show === true) {
        return <Progress linear/>
    }

    return (
        <Grid container direction="column" alignItems="center" justify="center">
            <Paper variant="outlined" className={classes.headerText}>
                <Typography variant="h6">
                    General Information
                </Typography>
            </Paper>

            <Card raised style={{marginBottom: 20, marginRight: 20, width: '100%'}}>
                <DataGrid
                    autoHeight
                    rows={clientAddresses}
                    columns={addressColumn}
                    pageSize={3}/>
            </Card>

            <Card raised style={{marginBottom: 20, marginRight: 20, width: '100%'}}>
                <DataGrid
                    autoHeight
                    rows={clientContacts}
                    columns={contactColumn}
                    pageSize={5}/>
            </Card>

            <Grid container direction="row" className={classes.root}>
                {cards.map((title, index) => (
                    <Card className={classes.card} key={title}>
                        <CardHeader
                            title={title}
                            action={
                                <MenuButton 
                                    menuItems={['Open', 'Export', 'Cancel']} 
                                    menuFunctions={[
                                        ( ) => props.changeView(index),
                                        ( ) => props.changeView(null),
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