import React from 'react';
import {
    Card,
    CardHeader,
    Grid,
    makeStyles,
    Paper,
    Typography
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DataTable from '../DataTable';
import MenuButton from '../../../../components/MenuButton';

const addressColumnNames = ["Addresses", "Address 1", "Address 2", "City", "State", "Zip"];
const addressRowNames = ["Corporate", "Billing", "Shipping"];
const contactColumnNames = ["Contacts", "Name", "Title", "Email", "Phone"];

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

const GeneralInfo = ({address, contacts, changeView}) => {
    const classes = useStyles( );
    const cards  = ["Advanced Info.", "Program Info.", "Billing Parts", "Attachments"];

    contacts.map((contact, index) => {
        delete contact.id;
        delete contact.clientId;
    });

    return (
        <Grid container direction="column" alignItems="center" justify="center">
            <Paper variant="outlined" className={classes.headerText}>
                <Typography variant="h6">
                    General Information
                </Typography>
            </Paper>
    
            <DataTable 
                tableHead={addressColumnNames} 
                tableBody={address} 
                rowNames={addressRowNames}/>
    
            <DataTable
                tableHead={contactColumnNames}
                tableBody={contacts}
                rowNames={[]}/>

            <Grid container direction="row" className={classes.root}>
                {cards.map((title, index) => (
                    <Card className={classes.card} key={title}>
                        <CardHeader
                            title={title}
                            action={
                                <MenuButton 
                                    menuItems={['Open', 'Export', 'Cancel']} 
                                    menuFunctions={[( ) => changeView(index)]}
                                    index={index}
                                    icon={MoreVertIcon}/>
                            }/>
                    </Card>
                ))}
            </Grid>
        </Grid>
    )
}

export default GeneralInfo;