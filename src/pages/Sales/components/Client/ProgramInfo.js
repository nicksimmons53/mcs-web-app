import React, { useEffect } from 'react';
import {
    Button,
    Divider,
    Grid,
    makeStyles,
    Tab,
    Tabs
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getClientPrograms, selectClientPrograms } from 'features/client/clientsSlice';
import DataTable from '../DataTable';
import Progress from 'components/Progress';

const tileInfoRows = [ "Floor Setting Material", "Floor Setting Material - Custom", "Setting Material Floors Product",
    "Wall Setting Material", "Wall Setting Material - Custom", "Setting Material Walls Product", "Alotted Float",
    "Allotted Float Charge", "Waterproofing Method", "Waterproofing Method - Shower Walls", "Waterproofing Method - Tub Walls",
    "Sova Construction?", "Will We Be Installing Backerboard?", "Backerboard Options", "Punch Out Material",
    "Shower Niche Construction", "Shower Niche Brand", "Shower Niche Standard Size", "Are Corner Soap Dishes Standard?",
    "Preferred Construction of Shower Seats", "Shower Seat Construction - Custom", "Schulter Options", "Pony Wall Options",
    "Preferred Grout Joint and Sizing", "Preferred Grout Brand", "Upgraded Grout", "Grout Product", 
    "Preferred Standard Practice for Subfloor", "Subfloor Practice - Other", "Tiel Return Walls at Backsplash", "Who Does Takeoffs?",
    "Waste Factor Percentage", "Waste Factor Percentage - Walls", "Waste Factor Percentage - Floors", "Waste Factor Percentage - Mosaics",
    "Wall Tile Height Options", "Notes"];
const woodInfoRows = ["Preferred Glue Products", "Will We Be Installing Floor Trim?", "Will Floor Trim Be...", 
    "Preferred Construction of 2nd Story Subfloor", "Are Transition Strips Standard Practice?",
    "HVAC Requirement?", "Who Will Be Doing Takeoffs?", "Waste Factor Percentage?", "Notes"];
const carpetInfoRows = ["Preferred Padding Brand", "Preferred Carpet Brand", "Who Will Be Doing Takeoffs?",
    "Waste Factor Percentage", "Notes"];
const countertopInfoRows = ["Preferred Material Thickness", "Preferred Material Thickness - Other", "Preferred Edge", 
    "Preferred Edge - Other", "Are Waterfall Sides Standard (or Option)?", "Faucet Holes (Are We Providing Sinks)?", "Stove Range Specifications",
    "Who Will Be Doing Takeoffs?", "Waste Factor Percentage", "Notes"];
const cabinetInfoRows = ["Preferred Colors", "Preferred Styles", "Preferences on Soft Close (Are They Standard?)",
    "Overlay", "Preferences and Sizes of Crown", "Std. Specifications for Upper Cabinets", "Std. Specifications for Vanity Height",
    "Preferences on Bid Types", "Any Areas Optioned Out?", "Notes"];

const useStyles = makeStyles({
    card: {
        flex: 1,
        margin: 10
    },
    headerText: {
        margin: 10,
        padding: 10
    },
    list: {
        flex: 1,
        margin: 10,
        paddingTop: 0
    }, 
    listHeader: {
        backgroundColor: '#1C1F33',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        color: '#FCFCFC'
    },
    root: {
        flex: 1
    },
    table: {
        borderWidth: 1,
        borderStyle: 'solid',
        flex: 5
    }
});

const ProgramInfo = ({...props}) => {
    const dispatch = useDispatch( );
    const classes = useStyles( );
    const [ tabValue, setTabValue ] = React.useState(0);

    // Redux
    const programStatus = useSelector(state => state.clients.clientStatus.programs);
    const programs = useSelector(selectClientPrograms);
    useEffect(( ) => {
        if (programStatus === 'idle') {
            dispatch(getClientPrograms(props.clientId));
        }
    }, [ dispatch ]);

    console.log(programs[4])

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

            <Grid container direction="column" alignItems="center">
                <Tabs value={tabValue} indicatorColor="secondary" onChange={handleTabChange}>
                    <Tab label="Tile"/>
                    <Tab label="Wood"/>
                    <Tab label="Carpet"/>
                    <Tab label="Countertops"/>
                    <Tab label="Cabinets"/>
                </Tabs>

                {renderedContent}
            </Grid>
            
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