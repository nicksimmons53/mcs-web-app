import React, { useEffect } from 'react';
import {
    Button,
    Divider,
    Grid,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getClientPrograms, selectClientPrograms } from 'features/client/clientsSlice';
import DataTable from '../DataTable';
import Progress from 'components/Progress';
import { tileInfoRows, woodInfoRows, carpetInfoRows, countertopInfoRows, cabinetInfoRows } from '../../static_data';

const ProgramInfo = ({...props}) => {
    const dispatch = useDispatch( );
    const [ tabValue, setTabValue ] = React.useState(0);

    // Redux
    const programStatus = useSelector(state => state.clients.clientStatus.programs);
    const programs = useSelector(selectClientPrograms);
    useEffect(( ) => {
        if (programStatus === 'idle') {
            dispatch(getClientPrograms(props.clientId));
        }
    }, [ dispatch, programStatus, props.clientId ]);

    const handleTabChange = (event, newValue) => { setTabValue(newValue) }

    let renderedContent;
    if (programStatus === 'loading') {
        renderedContent = <Progress/>;
    } else if (programStatus === 'succeeded') {
        renderedContent = (
            <>
                {tabValue === 0 &&
                    <DataTable
                        tableHead={["Questions", "Responses"]}
                        tableBody={programs[0]}
                        rowNames={tileInfoRows}/>
                }
                {tabValue === 1 &&
                    <DataTable
                        tableHead={["Questions", "Responses"]}
                        tableBody={programs[1]}
                        rowNames={woodInfoRows}/>
                }
                {tabValue === 2 &&
                    <DataTable
                        tableHead={["Questions", "Responses"]}
                        tableBody={programs[2]}
                        rowNames={carpetInfoRows}/>
                }
                {tabValue === 3 &&
                    <DataTable
                        tableHead={["Questions", "Responses"]}
                        tableBody={programs[3]}
                        rowNames={countertopInfoRows}/>
                }
                {tabValue === 4 &&
                    <DataTable
                        tableHead={["Questions", "Responses"]}
                        tableBody={programs[4]}
                        rowNames={cabinetInfoRows}/>
                }
            </>
        );
    }

    return (
        <Grid alignItems="center" justify="center">
            <Divider style={{marginBottom: 10}}/>

            <Typography variant="h6" align="center">Program Information</Typography>

            <Grid container direction="column" alignItems="center">
                <Tabs value={tabValue} indicatorColor="secondary" onChange={handleTabChange}>
                    <Tab label="Tile"/>
                    <Tab label="Wood"/>
                    <Tab label="Carpet"/>
                    <Tab label="Countertops"/>
                    <Tab label="Cabinets"/>
                </Tabs>

                <Grid container direction="column" alignContent="center">
                    {renderedContent}
                </Grid>
            </Grid>

            <Divider style={{marginTop: 50}}/>
            
            <Grid container alignItems="center" justify="center">
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={( ) => {
                        props.changeView(0);
                        setTabValue(0);
                    }}
                    style={{margin: 30, width: 250}}>
                    Client Home
                </Button>
            </Grid>
        </Grid>
    );
}

export default ProgramInfo;