import React from 'react';
import { 
    Button,
    Collapse,
    Divider,
    Grid, 
    IconButton, 
    List, 
    ListItem, 
    ListItemText, 
    makeStyles,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients } from '../../../features/client/clientsSlice';
import ClientGrid from './ClientGrid';

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
    }
});

function ClientList( ) {
    // Hooks
    const classes = useStyles();
    const [ sortMenuAnchorEl, setSortMenuAnchorEl ] = React.useState(null);
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ tabValue, setTabValue ] = React.useState(0);
    const [ clientView, setClientView ] = React.useState(false);

    // Redux Data
    const clients = useSelector(state => state.clients.values);

    const handleSortMenuClick = (event) => {
        setSortMenuAnchorEl(event.currentTarget);
    }

    const handleSortMenuClose = ( ) => {
        setSortMenuAnchorEl(null);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = ( ) => {
        setAnchorEl(null);
    }

    const handleClientView = (event) => {
        handleClose();

        setClientView((prev) => !prev);
    }

    const handleTabChange = (event, newValue) => {
        handleClose();

        setClientView(false);

        setTabValue(newValue);
    }

    return (
        <Grid container className={classes.root} direction="column">
            <Grid container direction="row" alignItems="center" justify="space-between">
                <Typography>
                </Typography>
                <Typography variant="h4" align="center" className={classes.text1}>
                    Client List
                </Typography>
                <IconButton onClick={handleSortMenuClick}>
                    <FilterListIcon fontSize="large" color="primary"/>
                </IconButton>

                <Menu
                    id="simple-menu"
                    anchorEl={sortMenuAnchorEl}
                    keepMounted
                    open={Boolean(sortMenuAnchorEl)}
                    onClose={handleSortMenuClose}>
                    <MenuItem>Sort A - Z</MenuItem>
                    <MenuItem>Sort Z - A</MenuItem>
                    <MenuItem>Sort by Submission Date</MenuItem>
                </Menu>
            </Grid>

            <Divider/>

            <Tabs centered value={tabValue} indicatorColor="secondary" onChange={handleTabChange}> 
                <Tab label="Queued"/>
                <Tab label="Approved"/>
                <Tab label="Active"/>
            </Tabs>

            <Divider/>

            <List className={classes.clientList}>
                {clients.map((client, index) => (
                    <>
                    <ListItem className={clientView ? classes.selectedClient : null}>
                        <Divider/>

                        <ListItemText>{client.clnnme} - {client.fstnme} {client.lstnme}</ListItemText>
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={handleClick}>
                            Actions
                        </Button>

                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem onClick={handleClientView}>{clientView ? "Collapse" : "View"}</MenuItem>
                            <MenuItem onClick={handleClose}>Message Sales Rep.</MenuItem>
                            <MenuItem onClick={handleClose}>Approve</MenuItem>
                            <MenuItem onClick={handleClose}>Decline</MenuItem>
                            <MenuItem onClick={handleClose}>Export</MenuItem>

                            <Divider/>

                            <MenuItem onClick={handleClose}>Cancel</MenuItem>
                        </Menu>
                    </ListItem>

                    <Collapse in={clientView}>
                        <Divider/>
                        <ClientGrid client={client} handleClientView={handleClientView}/>
                    </Collapse>
                    </>
                ))}
            </List>
        </Grid>
    );
}

export default ClientList;