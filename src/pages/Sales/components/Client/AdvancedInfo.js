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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { getClientInfo, selectClientInfo } from 'features/client/clientsSlice';
import DataTable from '../DataTable';
import MenuButton from '../../../../components/MenuButton';
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
        <Grid container direction="column" alignItems="center" justify="center">
            <Divider style={{margin: 10, marginLeft: 30}}/>

            {renderedContent}
            
            <Grid container alignItems="center" justify="center">
                <Button variant="contained" color="secondary" onClick={( ) => props.changeView(0)}>
                    Client Home
                </Button>
            </Grid>
        </Grid>
    );
}

export default AdvancedInfo;