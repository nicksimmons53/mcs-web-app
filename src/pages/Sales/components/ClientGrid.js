import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Paper,
    Slide,
    Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DataTable from './DataTable';
import { formatAddress } from '../../../helpers/formatAddress';

const useStyles = makeStyles({
    root: {
        flex: 1,
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25
    },
    headerText: {
        margin: 10,
        padding: 10
    },
    table: {
        margin: 10
    },
    card: {
        flex: 1,
        margin: 10
    },
    collapseButton: {
        height: 45,
        margin: 20,
        minWidth: 200
    }
});

// Table 
const addressColumnNames = ["Addresses", "Address 1", "Address 2", "City", "State", "Zip"];
const addressRowNames = ["Corporate", "Billing", "Shipping"];
const contactColumnNames = ["Contacts", "Name", "Title", "Email", "Phone"];
const advInfoColumnNames = ["Payment Frequency", "Autopay?", "How Are Invoices Submitted?","Invoice Email",
    "Invoice Drop-Off Address", "Invoice Mail Address", "Payment Type",
    "Payment Portal", "Payment Portal URL", "PO's Required?", "Are PO's Required for Invoice Submittal?",
    "Approvals Required?", "Accounting Contact", "Contact Phone", "Contact Email", "Vendor Portal",
    "Vendor Portal Username", "Vendor Portal Password", "How Are Jobs Released?", "Job Release Contact",
    "PO Correction Handling?", "PO Correction Handling Email", "Expected Start Date", "Estimated Number of Homes"];

function ClientGrid(props) {
    const classes = useStyles();
    const [ menuValue, setMenuValue ] = React.useState(null);
    const [ basicInfoView, setBasicInfoView ] = React.useState(true);
    const [ advInfoView, setAdvInfoView ] = React.useState(false);

    const cards = ["Advanced Information", "Program Information", "Billing Parts", "File Attachments"];

    // Redux Data

    const handleClick = (event) => {
        setMenuValue(event.currentTarget);
    }

    const handleClose = ( ) => {
        setMenuValue(null);
    }

    const handleAdvInfoChange = ( ) => {
        handleClose();
        setBasicInfoView((prev) => !prev);
        setAdvInfoView((prev) => !prev);
    };

    const GeneralInfo = ({address, contacts}) => (
        <>
            <Paper variant="outlined" className={classes.headerText}>
                <Typography variant="h6">
                    General Information
                </Typography>
            </Paper>

            <DataTable 
                tableHead={addressColumnNames} 
                tableBody={address} 
                rowNames={addressRowNames}/>

            <DataTable
                tableHead={contactColumnNames}
                tableBody={contacts}
                rowNames={[]}/>
        </>
    );

    const AdvancedInfo = ({advInfo}) => {
        // Reformat Fields
        let address = formatAddress([advInfo.invoice_addr, advInfo.invoice_city, advInfo.invoice_state, advInfo.invoice_zip]);
        Object.keys(advInfo).map((key, index) => { 
            if (advInfo[key] === 1)
                advInfo[key] = "Yes";
            else if (advInfo[key] === 0)
                advInfo[key] = "No";
        });

        // Reformat Advanced Info
        let formattedAdvInfo = Object.entries(advInfo).map(([k, v]) => ({ [k] : v }));
        formattedAdvInfo.splice(4, 0, { invoice_addr: address });
        formattedAdvInfo.splice(5, 4, { invoice_addr: address });

        return (
            <DataTable 
                tableHead={["Questions", "Responses"]} 
                tableBody={formattedAdvInfo}
                rowNames={advInfoColumnNames}/>
        );
    }

    const ProgramInfo = ({programInfo}) => {
        return (
            <DataTable
                tableHead={["Questions", "Responses"]}
                />
        );
    }

    return (
        <Grid container className={classes.root} alignItems="center" justify="center">
            { basicInfoView ?
                <Slide direction="left" in={basicInfoView} mountOnEnter unmountOnExit>
                    <Grid container alignItems="center" justify="center">
                        <GeneralInfo address={props.client.address} contacts={props.client.contacts}/>
        
                        {cards.map((title, index) => (
                            <Card className={classes.card} key={title}>
                                <CardHeader
                                    title={title}
                                    action={
                                        <IconButton onClick={handleClick}>
                                            <MoreVertIcon color="primary"/>
                                        </IconButton>
                                    }/>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={menuValue}
                                    keepMounted
                                    open={Boolean(menuValue)}
                                    onClose={handleClose}>
                                    <MenuItem onClick={handleAdvInfoChange}>Open</MenuItem>
                                    <MenuItem onClick={handleClose}>Export</MenuItem>
                                    <Divider/>
                                    <MenuItem onClick={handleClose}>Cancel</MenuItem>
                                </Menu>
                            </Card>
                        ))}
                    </Grid>
                </Slide>
                :
                null
            }

            { advInfoView ?
                <Slide direction="left" in={advInfoView} mountOnEnter unmountOnExit>
                    <Grid container alignItems="center" justify="center">
                        <Grid container alignItems="flex-start">
                            <IconButton color="secondary" onClick={handleAdvInfoChange}>
                                <ArrowBackIcon fontSize="large"/>
                            </IconButton>
                        </Grid>

                        <AdvancedInfo advInfo={props.client.advInfo}/>
                    </Grid>
                </Slide>
                :
                null
            }

            <Grid container direction="row" justify="center" alignItems="center">
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={props.handleClientView} 
                    className={classes.collapseButton}>
                    Collapse
                </Button>
            </Grid>
        </Grid>
    );
}

export default ClientGrid;