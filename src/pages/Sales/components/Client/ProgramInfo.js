import React from 'react';
import {
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
import DataTable from '../DataTable';
import { formatTinyInt } from '../../../../helpers/dataFormatter';

const tileProgInfoRowNames = ["Floor Setting Material", "Setting Material Floors Product", "Wall Setting Material",
    "Setting Material Walls Product",  "Wall Setting Material Custom Choice",  "Floor Setting Material Custom Choice", 
    "Waterproofing Method - Shower Walls", "Waterproofing Method - Tub Wall", "Allotted Float", "Charge for Extra Float", "Waterproofing Method",
    "Sova Construction?", "Will We Be Installing Backerboard?", "Punch Out Material",  "Are Corner Soap Dishes Standard?", "Shower Niche Construction", 
    "Are Corner Soap Dishes Standard?", "Preferred Construction of Shower Seats", "Shower Seat Construction - Other",
    "Schulter Options", "Pony Wall Options", "Shower Niche Construction", "Preferred Grout Joint and Sizing", 
    "Preferred Grout Brand",  "Grout Product", "Upgraded Grout", "Preferred Standard Practice for Subfloor", "Subfloor - Other",
    "Who Does Takeoffs?", "Tile Return Walls at Backsplash?", "Waste Factor Percentage", 
    "Waste Factor Percentage - Walls", "Waste Factor Percentage - Floors", "Waste Factor Percentage - Mosaics",
    "Wall Tile Height Options", "Notes"];
const woodProgInfoRowNames = ["Preferred Glue Products", "Will We Be Installing Floor Trim?", "Will Floor Trim Be...", 
    "Preferred Construction of 2nd Story Subfloor", "Are Transition Strips Standard Practice?",
    "HVAC Requirement?", "Who Will Be Doing Takeoffs?", "Waste Factor Percentage?", "Notes"];
const carpetProgInfoRowNames = ["Preferred Padding Brand", "Preferred Carpet Brand", "Who Will Be Doing Takeoffs?",
    "Waste Factor Percentage", "Notes"];
const countertopProgInfoRowNames = ["Preferred Material Thickness", "Preferred Material Thickness - Other", "Preferred Edge", 
    "Preferred Edge - Other", "Are Waterfall Sides Standard (or Option)?", "Faucet Holes (Are We Providing Sinks)?", "Stove Range Specifications",
    "Who Will Be Doing Takeoffs?", "Waste Factor Percentage", "Notes"];
const cabinetProgInfoRowNames = ["Preferred Colors", "Preferred Styles", "Preferences on Soft Close (Are They Standard?)",
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

const ProgramInfo = ({programInfo, changeView}) => {
    const classes = useStyles( );
    const [ selectedIndex, setSelectedIndex ] = React.useState(0);
    const programs = ['Tile', 'Wood', 'Carpet', 'Countertops', 'Cabinets'];

    const handleListItemClick = (event, index) => { setSelectedIndex(index) }

    // Tile Program Info Formatting & Cleanup
    programInfo.tileProgram = formatTinyInt(programInfo.tileProgram);
    delete programInfo.tileProgram.id;
    delete programInfo.tileProgram.client_id;
    let formattedTileInfo = Object.entries(programInfo.tileProgram).map(([k, v]) => ({ [k] : v }));

    // Wood Program Info Formatting & Cleanup
    programInfo.woodProgram = formatTinyInt(programInfo.woodProgram);
    delete programInfo.woodProgram.id;
    delete programInfo.woodProgram.client_id;
    let formattedWoodInfo = Object.entries(programInfo.woodProgram).map(([k, v]) => ({ [k] : v }));

    // Carpet Program Info Formatting & Cleanup
    programInfo.carpetProgram = formatTinyInt(programInfo.carpetProgram);
    delete programInfo.carpetProgram.id;
    delete programInfo.carpetProgram.client_id;
    let formattedCarpetInfo = Object.entries(programInfo.carpetProgram).map(([k, v]) => ({ [k] : v }));

    // Countertop Program Info Formatting & Cleanup
    programInfo.countertopProgram = formatTinyInt(programInfo.countertopProgram);
    delete programInfo.countertopProgram.id;
    delete programInfo.countertopProgram.client_id;
    let formattedCountertopInfo = Object.entries(programInfo.countertopProgram).map(([k, v]) => ({ [k] : v }));

    // Countertop Program Info Formatting & Cleanup
    programInfo.cabinetProgram = formatTinyInt(programInfo.cabinetProgram);
    delete programInfo.cabinetProgram.id;
    delete programInfo.cabinetProgram.client_id;
    let formattedCabinetInfo = Object.entries(programInfo.cabinetProgram).map(([k, v]) => ({ [k] : v }));

    return (
        <Grid alignItems="center" justify="center">
            <Grid container alignItems="center">
                <IconButton color="secondary" onClick={( ) => {
                        changeView(null); 
                        setSelectedIndex(0)}
                    }>
                    <ArrowBackIcon fontSize="large"/>
                </IconButton>
                <Typography color="secondary">Go Back</Typography>
            </Grid>

            <Divider style={{margin: 10}}/>

            <Grid container direction="row">
                <Paper variant="outline" className={classes.list}>
                    <List disablePadding> 
                        <ListItem className={classes.listHeader} divider>Programs</ListItem>
                        
                        {programs.map((program, index) => (
                            <ListItem 
                                button 
                                selected={selectedIndex === index} 
                                onClick={(event) => handleListItemClick(event, index)}
                                key={program}>
                                {program}
                            </ListItem>
                        ))}
                    </List>
                </Paper>
                
                {selectedIndex === 0 &&
                    <DataTable
                        tableName={programs[selectedIndex]}
                        tableHead={["Questions", "Responses"]}
                        tableBody={formattedTileInfo}
                        rowNames={tileProgInfoRowNames}/>
                }

                {selectedIndex === 1 &&
                    <DataTable
                        tableName={programs[selectedIndex]}
                        tableHead={["Questions", "Responses"]}
                        tableBody={formattedWoodInfo}
                        rowNames={woodProgInfoRowNames}/>
                }

                {selectedIndex === 2 &&
                    <DataTable
                        tableName={programs[selectedIndex]}
                        tableHead={["Questions", "Responses"]}
                        tableBody={formattedCarpetInfo}
                        rowNames={carpetProgInfoRowNames}/>
                }

                {selectedIndex === 3 &&
                    <DataTable
                        tableName={programs[selectedIndex]}
                        tableHead={["Questions", "Responses"]}
                        tableBody={formattedCountertopInfo}
                        rowNames={countertopProgInfoRowNames}/>
                }

                {selectedIndex === 4 &&
                    <DataTable
                        tableName={programs[selectedIndex]}
                        tableHead={["Questions", "Responses"]}
                        tableBody={formattedCabinetInfo}
                        rowNames={cabinetProgInfoRowNames}/>
                }
            </Grid>
        </Grid>
    );
}

export default ProgramInfo;