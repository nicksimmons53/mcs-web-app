import React, { useEffect } from 'react';
import {
    Button,
    Card,
    Divider,
    Grid,
    makeStyles,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import "@fontsource/montserrat";
import { useSelector, useDispatch } from 'react-redux';
import { getClientParts, selectClientParts } from 'features/client/clientsSlice';
import _ from 'lodash';
import Progress from 'components/Progress';
import { 
    fullColumn, descTotalColumn, levelTotalColumn, descUnitTotalColumn, 
    levelUnitTotalColumn, typeTotalColumn, typeColorTotalColumn,
} from '../../static_data';
import TabMenu from 'components/TabMenu';

const useStyles = makeStyles({
    tableHeader: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        margin: 10
    }
})

const BillingPartsInfo = ({...props}) => {
    const classes = useStyles( );
    const dispatch = useDispatch();
    const tabs = ["Carpet", "Countertop", "Tile", "Vinyl", "Wood"];
    const [ tabValue, setTabValue ] = React.useState(0);
    
    const carpetColumns = {
        'Carpet Flooring': fullColumn, 
        'Carpet Pad': levelUnitTotalColumn
    };

    const countertopColumns = {
        'Edges': typeTotalColumn, 
        'Sinks/Shape': descTotalColumn,  
        'Level 1': typeColorTotalColumn,
        'Level 2': typeColorTotalColumn,  
        'Level 3': typeColorTotalColumn,  
        'Level 4': typeColorTotalColumn,
        'Level 5': typeColorTotalColumn,  
        'Level 6': typeColorTotalColumn,  
        'Level 7': typeColorTotalColumn,
        'Level 8': typeColorTotalColumn,  
        'Level 9': typeColorTotalColumn,  
        'Level 10': typeColorTotalColumn,
    };

    const tileColumns = {
        'Floor Tile': fullColumn, 
        'Bathroom Wall Tile': fullColumn, 
        'Backsplash Wall Tile': fullColumn, 
        'Fireplace Wall Tile': fullColumn, 
        'Floor Stone': fullColumn, 
        'Bathroom Wall Stone': fullColumn,
        'Backsplash Wall Stone': fullColumn, 
        'Fireplace Wall Stone': fullColumn, 
        'Shower Pans - Stone': levelTotalColumn, 
        'Shower Pans - Tile': levelTotalColumn, 
        'Shower Pans - Deco': levelTotalColumn,
        'Underlayment': descTotalColumn, 
        'Pattern Charges': descTotalColumn, 
        'Accents': descTotalColumn, 
        'Shower Seats': descUnitTotalColumn,
        'Add-Ons': descUnitTotalColumn
    };

    const vinylColumns = {
        'Vinyl Plank': fullColumn,
        'Vinyl Sheet': fullColumn
    };

    const woodColumns = {
        'Wood Flooring': fullColumn,
        'Underlayment': descTotalColumn
    };

    // Redux
    const partStatus = useSelector(state => state.clients.clientStatus.parts);
    const parts = useSelector(selectClientParts);
    useEffect(( ) => {
        if (partStatus === 'idle') {
            dispatch(getClientParts(props.clientId));
        }
    }, [ dispatch, partStatus, props.clientId ]);

    const handleTabChange = (event, newValue) => { setTabValue(newValue) }

    let renderedContent;
    if (partStatus === 'loading') {
        return <Progress/>;
    } else if (partStatus === 'succeeded') {
        renderedContent = (
            <>
                { tabValue === 0 &&
                    <Grid style={{flex: 5}}>
                        {
                            Object.keys(parts[2]).map((table, index) => (
                                <Card raised key={index} style={{marginBottom: 10, marginTop: 10}}>
                                    <Typography variant="h5" align="center" className={classes.tableHeader}>{table}</Typography>
                                    <DataGrid 
                                        autoHeight
                                        rows={parts[2][table]} 
                                        columns={Object.values(_.pick(carpetColumns, table))[0]} 
                                        pageSize={10}/>
                                </Card>
                            ))
                        }
                    </Grid>
                }

                { tabValue === 1 &&
                    <Grid style={{flex: 5}}>
                        {
                            Object.keys(parts[3]).map((table, index) => (
                                <Card raised key={index}  style={{marginBottom: 10, marginTop: 10}}>
                                    <Typography variant="h5" align="center" style={{margin:10}}>{table}</Typography>
                                    <DataGrid 
                                        autoHeight
                                        rows={parts[3][table]} 
                                        columns={Object.values(_.pick(countertopColumns, table))[0]} 
                                        pageSize={10}/>
                                </Card>
                            ))
                        }
                    </Grid>
                }

                { tabValue === 2 &&
                    <Grid style={{flex: 5}}>
                        {
                            Object.keys(parts[0]).map((table, index) => (
                                <Card raised key={index} style={{marginBottom: 10, marginTop: 10}}>
                                    <Typography variant="h5" align="center" style={{margin:10}}>{table}</Typography>
                                    <DataGrid 
                                        autoHeight
                                        rows={parts[0][table]} 
                                        columns={Object.values(_.pick(tileColumns, table))[0]} 
                                        pageSize={10}/>
                                </Card>
                            ))
                        }
                    </Grid>
                }

                { tabValue === 3 &&
                    <Grid style={{flex: 5}}>
                        {
                            Object.keys(parts[4]).map((table, index) => (
                                <Card raised key={index} style={{marginBottom: 10, marginTop: 10}}>
                                    <Typography variant="h5" align="center" style={{margin:10}}>{table}</Typography>
                                    <DataGrid 
                                        autoHeight
                                        rows={parts[4][table]} 
                                        columns={Object.values(_.pick(vinylColumns, table))[0]} 
                                        pageSize={10}/>
                                </Card>
                            ))
                        }
                    </Grid>
                }

                { tabValue === 4 &&
                    <Grid style={{flex: 5}}>
                        {
                            Object.keys(parts[1]).map((table, index) => (
                                <Card raised key={index} style={{marginBottom: 10, marginTop: 10}}>
                                    <Typography variant="h5" align="center" style={{margin:10}}>{table}</Typography>
                                    <DataGrid 
                                        autoHeight
                                        rows={parts[1][table]} 
                                        columns={Object.values(_.pick(woodColumns, table))[0]} 
                                        pageSize={10}/>
                                </Card>
                            ))
                        }
                    </Grid>
                }
            </>
        );
    }

    return (
        <Grid>
            <Divider style={{marginBottom: 10}}/>

            <Typography variant="h6" align="center" className={classes.tableHeader}>Billing Parts</Typography>

            <Grid container direction="column" alignItems="center">
                <TabMenu tabs={tabs} value={tabValue} setValue={setTabValue}/>
            </Grid>
        </Grid>
    );
}

export default BillingPartsInfo;