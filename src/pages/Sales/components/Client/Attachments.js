import React, { useEffect } from 'react';
import {
    Button,  
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import MenuButton from 'components/MenuButton';

require('dotenv').config( );

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '75%'
    }
});

const Attachments = ({...props}) => {
    const classes = useStyles( );

    const downloadFile = (row) => {
        return window.location.href = process.env.REACT_APP_S3_URL + row.Key;
    };

    const columns = [
        { id: 'id'},
        { field: 'name', headerName: 'File Name', flex: 1 },
        { field: 'type', headerName: 'File Type', flex: 1 },
        { field: 'LastModified', headerName: 'Upload Date', flex: 1 },
        { 
            field: 'action', 
            headerName: ' ',
            flex: 1, 
            align: 'center',
            renderCell: (params) => (
                <MenuButton
                    menuItems={[ 'Download', 'Close' ]}
                    menuFunctions={[ 
                        ( ) => downloadFile(params.row)
                    ]}
                    actionComp="button"/>
            )
        }
    ];

    return (
        <Grid alignItems="center" justify="center" className={classes.root}>
            <Typography variant="h5" align="center" style={{margin:10}}>Client Files</Typography>

            <DataGrid 
                autoHeight
                rows={props.files} 
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