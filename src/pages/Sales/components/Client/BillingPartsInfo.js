import React from 'react';
import {
    Card,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    makeStyles,
    Paper,
    Typography
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const fullColumn = [
    { field: 'level', headerName: 'Level', flex: 1 },
    { field: 'unit', headerName: 'Unit', flex: 1 },
    { field: 'material', headerName: 'Material', flex: 1 },
    { field: 'materialTax', headerName: 'Material w/ Tax', flex: 1 },
    { field: 'labor', headerName: 'Labor', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1 }
];

const descTotalColumn = [
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'total', headerName: 'Cost per SqFt', flex: 1 }
];

const levelTotalColumn = [
    { field: 'level', headerName: 'Level', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1 }
];

const patternTotalColumn = [
    { field: 'pattern', headerName: 'Pattern', flex: 1 },
    { field: 'total', headerName: 'Cost per SqFt', flex: 1 }
];

const descUnitTotalColumn = [
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'unit', headerName: 'Unit', flex: 1 },
    { field: 'total', headerName: 'Cost', flex: 1}
];

const levelUnitTotalColumn = [
    { field: 'level', headerName: 'Level', flex: 1 },
    { field: 'unit', headerName: 'Unit', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1}
];

const typeTotalColumn = [
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1}
];

const typeColorTotalColumn = [
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'color', headerName: 'Color', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1}
];

const useStyles = makeStyles({
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
    }
});

const BillingPartsInfo = ({parts, changeView}) => {
    const classes = useStyles();
    const [ selectedIndex, setSelectedIndex ] = React.useState(0);
    const programs = ['Carpet', 'Countertops', 'Tile', 'Vinyl', 'Wood'];

    let tileParts = parts[0];
    let woodParts = parts[1];
    let carpetParts = parts[2];
    let countertopParts = parts[3];
    let vinylParts = parts[4];

    const handleListItemClick = (event, index) => { setSelectedIndex(index) }

    const CarpetTables = ( ) => (
        <Grid direction="column" style={{flex: 5}}>
            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Carpet Flooring</Typography>
                <DataGrid 
                    autoHeight
                    rows={carpetParts[0]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Carpet Pad</Typography>
                <DataGrid 
                    autoHeight
                    rows={carpetParts[1]} 
                    columns={levelUnitTotalColumn} 
                    pageSize={10}/>
            </Card>
        </Grid>
    );

    const CountertopTables = ( ) => (
        <Grid direction="column" style={{flex: 5}}>
            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Edges</Typography>
                <DataGrid 
                    autoHeight
                    rows={countertopParts[0]} 
                    columns={typeTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Sinks</Typography>
                <DataGrid 
                    autoHeight
                    rows={countertopParts[1]} 
                    columns={descTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Level 1</Typography>
                <DataGrid 
                    autoHeight
                    rows={countertopParts[2]} 
                    columns={typeColorTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Level 2</Typography>
                <DataGrid 
                    autoHeight
                    rows={countertopParts[3]} 
                    columns={typeColorTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Level 3</Typography>
                <DataGrid 
                    autoHeight
                    rows={countertopParts[4]} 
                    columns={typeColorTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Level 4</Typography>
                <DataGrid 
                    autoHeight
                    rows={countertopParts[5]} 
                    columns={typeColorTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Level 5</Typography>
                <DataGrid 
                    autoHeight
                    rows={countertopParts[6]} 
                    columns={typeColorTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Level 6</Typography>
                <DataGrid 
                    autoHeight
                    rows={countertopParts[7]} 
                    columns={typeColorTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Level 7</Typography>
                <DataGrid 
                    autoHeight
                    rows={countertopParts[8]} 
                    columns={typeColorTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Level 8</Typography>
                <DataGrid 
                    autoHeight
                    rows={countertopParts[9]} 
                    columns={typeColorTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Level 9</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[10]} 
                    columns={typeColorTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Level 10</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[11]} 
                    columns={typeColorTotalColumn} 
                    pageSize={10}/>
            </Card>
        </Grid>
    )

    const TileTables = ( ) => (
        <Grid direction="column" style={{flex: 5}}>
            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Floor Tile</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[0]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Bathroom Wall Tile</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[1]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Backsplash Wall Tile</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[2]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Fireplace Wall Tile</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[3]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Floor Stone</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[4]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Bathroom Wall Stone</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[5]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Backsplash Wall Stone</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[6]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Fireplace Wall Stone</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[7]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Shower Pans - Stone</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[8]} 
                    columns={levelTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Shower Pans - Tile</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[9]} 
                    columns={levelTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Shower Pans - Deco</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[10]} 
                    columns={levelTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Underlayment</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[11]} 
                    columns={descTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Pattern Charges</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[12]} 
                    columns={patternTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Accents</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[13]} 
                    columns={patternTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Shower Seats</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[14]} 
                    columns={descUnitTotalColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Add-Ons</Typography>
                <DataGrid 
                    autoHeight
                    rows={tileParts[15]} 
                    columns={descUnitTotalColumn} 
                    pageSize={10}/>
            </Card>
        </Grid>
    );

    const VinylTables = ( ) => (
        <Grid direction="column" style={{flex: 5}}>
            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Vinyl Flooring</Typography>
                <DataGrid 
                    autoHeight
                    rows={vinylParts[0]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Vinyl Sheet</Typography>
                <DataGrid 
                    autoHeight
                    rows={vinylParts[1]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>
        </Grid>
    )

    const WoodTables = ( ) => (
        <Grid direction="column" style={{flex: 5}}>
            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Wood Flooring</Typography>
                <DataGrid 
                    autoHeight
                    rows={woodParts[0]} 
                    columns={fullColumn} 
                    pageSize={10}/>
            </Card>

            <Card raised style={{marginBottom: 10, marginTop: 10}}>
                <Typography variant="h5" align="center" style={{margin:10}}>Underlayment</Typography>
                <DataGrid 
                    autoHeight
                    rows={woodParts[1]} 
                    columns={descTotalColumn} 
                    pageSize={10}/>
            </Card>
        </Grid>
    );

    return (
        <Grid alignItems="center" justify="center">
            <Grid container alignItems="center">
                <IconButton color="secondary" onClick={( ) => changeView(null)}>
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

                { selectedIndex === 0 && <CarpetTables/> }

                { selectedIndex === 1 && <CountertopTables/> }

                { selectedIndex === 2 && <TileTables/> }

                { selectedIndex === 3 && <VinylTables/> }

                { selectedIndex === 4 && <WoodTables/> }
            </Grid>
        </Grid>
    );
}

export default BillingPartsInfo;