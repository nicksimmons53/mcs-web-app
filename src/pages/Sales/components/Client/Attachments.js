import React from 'react';
import {
    Card,
    Divider,
    Grid,
    IconButton,
    Typography
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const columns = [
    { field: 'name', headerName: 'File Name', flex: 1 },
    { field: 'type', headerName: 'File Type', flex: 1 },
    { field: 'uploadDate', headerName: 'Upload Date', flex: 1 }
];

const Attachments = ({changeView}) => {
    return (
        <Grid alignItems="center" justify="center">
            <Grid container alignItems="center">
                <IconButton color="secondary" onClick={( ) => changeView(null)}>
                    <ArrowBackIcon fontSize="large"/>
                </IconButton>
                <Typography color="secondary">Go Back</Typography>
            </Grid>

            <Divider style={{margin: 10}}/>

            <Typography variant="h5" align="center" style={{margin:10}}>Client Files</Typography>
            <DataGrid 
                autoHeight
                checkboxSelection
                rows={[]} 
                columns={columns} 
                pageSize={10}/>
        </Grid>
    );
}

export default Attachments;