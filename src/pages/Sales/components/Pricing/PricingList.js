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
    const [ tabValue, setTabValue ] = React.useState(0);
    const [ pageNum, setPageNum ] = React.useState(1);

    // Redux Data
    const clientStatus = useSelector(state => state.clients.status);
    const clients = useSelector(selectAllClients);
    const clientId = useSelector(selectedClientId);

    const handlePageChange = (event, value) => { 
        setPageNum(value);
        window.scrollTo(0, 0);
    }

    return clients !== null && (
        <Grid container direction="column" className={props.expand ? classes.expandedRoot : classes.root}>
            <Divider/>

            <Pagination 
                    page={pageNum}
                    shape="rounded"
                    className={classes.pagination}
                    onChange={handlePageChange}/>
        </Grid>
    );
}

export default ClientList;