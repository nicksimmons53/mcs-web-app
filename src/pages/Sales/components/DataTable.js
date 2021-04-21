import React from 'react';
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25
    },
    tableTitle: {
        flex: '100%',
        margin: 20,
        marginBottom: 0
    },
    headerText: {
        margin: 10,
        padding: 10
    },
    table: {
        flex: 8,
        margin: 10
    },
    card: {
        flex: 1,
        margin: 10
    }
});

function DataTable(props) {
    const classes = useStyles( );
    
    return (
        <TableContainer component={Paper} variant="outlined" className={classes.table}>
            <Table>
                <TableHead>
                    {props.tableName && 
                        <Typography className={classes.tableTitle} variant="h5">
                            {props.tableName}
                        </Typography>
                    }
                    
                    <TableRow>
                        {props.tableHead.map((cell, index) => (
                            <TableCell>{cell}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    { props.tableBody.map((row, index) => (
                        <TableRow>
                            {props.rowNames.length !== 0 ? 
                                <TableCell>{props.rowNames[index]}</TableCell>
                                : 
                                <TableCell>{index + 1}</TableCell>
                            }
                            
                            {Object.keys(row).map((cell, index) => {
                                if (cell === "id")
                                    return;
                                else if (cell === "clientId")
                                    return;
                                else 
                                    return (
                                        <TableCell>{row[cell]}</TableCell>
                                    )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DataTable;