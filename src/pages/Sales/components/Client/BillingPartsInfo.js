import React, { useEffect } from 'react';
import {
    Card,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    makeStyles,
    Switch,
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
    },
    switchLabel: {
        fontFamily: 'Montserrat'
    }
})

const BillingPartsInfo = ({...props}) => {
    const classes = useStyles( );
    const dispatch = useDispatch();
    const tabs = ["Carpet", "Countertop", "Tile", "Vinyl", "Wood"];
    const [ tabValue, setTabValue ] = React.useState(0);
    const [ pageView, setPageView ] = React.useState(false);

    const columns = {
        Carpet: {
            'Carpet Flooring': fullColumn, 
            'Carpet Pad': levelUnitTotalColumn
        },
        Countertop: {
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
            'Level 10': typeColorTotalColumn
        },
        Tile: {
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
        },
        Wood: {
            'Wood Flooring': fullColumn,
            'Underlayment': descTotalColumn
        },
        Vinyl: {
            'Vinyl Plank': fullColumn,
            'Vinyl Sheet': fullColumn
        }
    };

    // Redux
    const partStatus = useSelector(state => state.clients.clientStatus.parts);
    const parts = useSelector(selectClientParts);
    useEffect(( ) => {
        if (partStatus === 'idle') {
            dispatch(getClientParts(props.clientId));
        }
    }, [ dispatch, partStatus, props.clientId ]);

    const ProgramPage = ({program, programName}) => {
        return (
            <Grid style={{flex: 1}}>
                {
                    Object.keys(program).map((table, index) => (
                        <Card raised key={index} style={{marginBottom: 10, marginTop: 10}}>
                            <Typography variant="h5" align="center" className={classes.tableHeader}>{table}</Typography>
                            <DataGrid 
                                autoHeight
                                rows={program[table]} 
                                columns={columns[programName][table]}
                                pageSize={10}/>
                        </Card>
                    ))
                }
            </Grid>
        )
    };
    
    if (partStatus === 'loading') {
        return <Progress/>;
    }

    return parts !== null && (
        <Grid>
            <Divider style={{marginBottom: 10}}/>

            <Grid container direction="row" alignItems="center" justify="space-between">
                <Typography variant="h6" align="center" className={classes.tableHeader}>Billing Parts</Typography>

                <FormGroup row>
                    <FormControlLabel 
                        control={<Switch checked={pageView} onChange={( ) => setPageView(!pageView)}/>} 
                        label="Page View"
                        classes={classes.switchLabel}/>
                </FormGroup>
            </Grid>

            <Divider/>

            <Grid container direction="column" alignItems="center">
                <TabMenu tabs={tabs} value={tabValue} setValue={setTabValue}/>
            </Grid>

            <Divider/>

            { tabValue === 0 && <ProgramPage program={parts.Carpet} programName="Carpet"/> }

            { tabValue === 1 && <ProgramPage program={parts.Countertop} programName="Countertop"/> }

            { tabValue === 2 && <ProgramPage program={parts.Tile} programName="Tile"/> }

            { tabValue === 3 && <ProgramPage program={parts.Vinyl} programName="Vinyl"/> }

            { tabValue === 4 && <ProgramPage program={parts.Wood} programName="Wood"/> }
        </Grid>
    );
}

export default BillingPartsInfo;