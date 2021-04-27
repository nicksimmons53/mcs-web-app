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

    const RowNames = ({rowNames, index}) => {
        if (props.partTables === true) 
            return null;
        if (props.rowNames.length !== 0) 
            return <TableCell small>{rowNames[index]}</TableCell>;
        return <TableCell small>{index + 1}</TableCell>;
    }

    const DataCell = ({row, cell}) => {
        return <TableCell>{row[cell]}</TableCell>;
    }
    
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
                        <TableRow key={index} hover>
                            <RowNames rowNames={props.rowNames} index={index}/> 
                            
                            {Object.keys(row).map((cell, index) => (
                                <DataCell key={index} row={row} cell={cell}/>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DataTable;