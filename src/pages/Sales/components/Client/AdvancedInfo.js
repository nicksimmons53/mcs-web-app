import React, { useEffect } from 'react';
import {
    Button,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getClientInfo, selectClientInfo } from 'features/client/clientsSlice';
import DataTable from '../DataTable';
import Progress from 'components/Progress';
import { advInfoColumnNames } from '../../static_data';
    
const AdvancedInfo = ({...props}) => {
    const dispatch = useDispatch( );
    // Redux
    const infoStatus = useSelector(state => state.clients.clientStatus.advancedInfo);
    const info = useSelector(selectClientInfo);

    useEffect(( ) => {
        if (infoStatus === 'idle') {
            dispatch(getClientInfo(props.clientId));
        }
    }, [ dispatch, infoStatus, props.clientId ]);

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
        <Grid>
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