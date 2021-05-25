import React, { useEffect } from 'react';
import {
    Button,
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
import { useDispatch, useSelector } from 'react-redux';
import { getClientInfo, selectClientInfo } from 'features/client/clientsSlice';
import DataTable from '../DataTable';
import Progress from 'components/Progress';

const advInfoColumnNames = ["Payment Frequency", "Autopay?", "How Are Invoices Submitted?","Invoice Email",
    "Invoice Drop-Off Address", "Invoice Mail Address", "Payment Type",
    "Payment Portal", "Payment Portal URL", "PO's Required?", "Are PO's Required for Invoice Submittal?",
    "Approvals Required?", "Accounting Contact", "Contact Phone", "Contact Email", "Vendor Portal",
    "Vendor Portal Username", "Vendor Portal Password", "How Are Jobs Released?", "Job Release Contact",
    "PO Correction Handling?", "PO Correction Handling Email", "Expected Start Date", "Estimated Number of Homes"];
    
const AdvancedInfo = ({...props}) => {
    const dispatch = useDispatch( );

    // Redux
    const infoStatus = useSelector(state => state.clients.clientStatus.advancedInfo);
    const info = useSelector(selectClientInfo);

    useEffect(( ) => {
        if (infoStatus === 'idle') {
            dispatch(getClientInfo(props.clientId));
        }
    }, [ dispatch ]);

    let renderedContent;
    if (infoStatus === 'loading') {
        renderedContent = <Progress/>;
    } else if (infoStatus === 'succeeded') {
        renderedContent = (
            <DataTable 
                tableHead={["Questions", "Responses"]} 
                tableBody={info}
                rowNames={advInfoColumnNames}/>
        );
    }

    return (
        <Grid alignContent="center" justify="center">
            <Divider style={{marginBottom: 10}}/>

            <Typography variant="h6" align="center">Advanced Information</Typography>

            <Grid container direction="column" alignContent="center">
                {renderedContent}
            </Grid>

            <Divider style={{marginTop: 50}}/>
            
            <Grid container alignItems="center" justify="center">
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={( ) => props.changeView(0)}
                    style={{margin: 30, width: 250}}>
                    Client Home
                </Button>
            </Grid>
        </Grid>
    );
}

export default AdvancedInfo;