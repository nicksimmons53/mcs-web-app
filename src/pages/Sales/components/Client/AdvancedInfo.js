import React from 'react';
import {
    Card,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    makeStyles,
    Paper,
    Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DataTable from '../DataTable';
import MenuButton from '../../../../components/MenuButton';
import { formatAddress, objectToArray, formatTinyInt, floatToCurrency } from '../../../../helpers/dataFormatter';

const advInfoColumnNames = ["Payment Frequency", "Autopay?", "How Are Invoices Submitted?","Invoice Email",
    "Invoice Drop-Off Address", "Invoice Mail Address", "Payment Type",
    "Payment Portal", "Payment Portal URL", "PO's Required?", "Are PO's Required for Invoice Submittal?",
    "Approvals Required?", "Accounting Contact", "Contact Phone", "Contact Email", "Vendor Portal",
    "Vendor Portal Username", "Vendor Portal Password", "How Are Jobs Released?", "Job Release Contact",
    "PO Correction Handling?", "PO Correction Handling Email", "Expected Start Date", "Estimated Number of Homes"];
    
const AdvancedInfo = ({advInfo, changeView}) => {
    // Reformat Fields
    let address = formatAddress([advInfo.invoice_addr, advInfo.invoice_city, advInfo.invoice_state, advInfo.invoice_zip]);
    advInfo = formatTinyInt(advInfo);

    // Reformat Advanced Info
    let formattedAdvInfo = objectToArray(advInfo);
    formattedAdvInfo.splice(4, 0, { invoice_addr: address });
    formattedAdvInfo.splice(5, 4, { invoice_addr: address });

    return (
        <Grid alignItems="center" justify="center">
            <Grid container alignItems="center">
                <IconButton color="secondary" onClick={( ) => changeView(null)}>
                    <ArrowBackIcon fontSize="large"/>
                </IconButton>
                <Typography color="secondary">Go Back</Typography>
            </Grid>
            
            <Divider style={{margin: 10}}/>

            <DataTable 
                tableHead={["Questions", "Responses"]} 
                tableBody={formattedAdvInfo}
                rowNames={advInfoColumnNames}/>
        </Grid>
    );
}

export default AdvancedInfo;