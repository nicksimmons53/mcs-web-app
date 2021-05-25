import React from 'react';
import {
    Button,
    Divider,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '75%'
    }
});

const columns = [
    { field: 'name', headerName: 'File Name', flex: 1 },
    { field: 'type', headerName: 'File Type', flex: 1 },
    { field: 'uploadDate', headerName: 'Upload Date', flex: 1 }
];

const Attachments = ({...props}) => {
    const classes = useStyles( );

    return (
        <Grid alignItems="center" justify="center" className={classes.root}>
            <Typography variant="h5" align="center" style={{margin:10}}>Client Files</Typography>
            <DataGrid 
                autoHeight
                checkboxSelection
                rows={[]} 
                columns={columns} 
                pageSize={10}/>
            
            <Grid container alignItems="center" justify="center">
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={( ) => props.changeView(0)}
                    style={{margin: 30, width: 250}}>
                    Close
                </Button>
            </Grid>
        </Grid>
    );
}

export default Attachments;