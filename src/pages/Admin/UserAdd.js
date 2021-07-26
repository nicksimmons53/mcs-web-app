import React from 'react';
import { Button, Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import colors from 'assets/colors';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#FFFFFF",
        borderColor: colors.gunmetal,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 25,
        width: '75%'
    },
    form1: {
        margin: 25
    },
    form2: {
        margin: 25
    },
    textField: {
        margin: 10,
        width: '40%'
    }
});

function UserAdd( ) {
    const classes = useStyles( );
    // const { } = useForm( );

    return (
        <Grid container direction="column" alignItems="center">
            <Grid className={classes.root}>
                <Typography variant="h5">Add User</Typography>
                
                <Divider/>

                <Grid className={classes.form1}>
                    <Grid container direction="row" justify="center">
                        <Typography variant="h6">User Details</Typography>
                    </Grid>

                    <Grid container direction="row" justify="center">
                        <TextField label="First Name" variant="outlined" size="medium" className={classes.textField}/>
                        
                        <TextField label="Last Name" variant="outlined" size="medium" className={classes.textField}/>
                    </Grid>
                    
                    <Grid container direction="row" justify="center">
                        <TextField label="Phone" variant="outlined" size="medium" className={classes.textField}/>
                        
                        <TextField label="Email" variant="outlined" size="medium" className={classes.textField}/>
                    </Grid>
                    

                    <Grid container direction="row" justify="center">
                        <FormControl variant="filled" className={classes.textField}>
                            <InputLabel>Department</InputLabel>
                            <Select>
                                <MenuItem></MenuItem>
                                <MenuItem>Accounting</MenuItem>
                                <MenuItem>Expediting</MenuItem>
                                <MenuItem>Sales</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField label="Manager" variant="outlined" size="medium" className={classes.textField}/>
                    </Grid>
                </Grid>

                <Divider/> 

                <Grid className={classes.form2}>
                    <Grid container direction="row" justify="center">
                        <Typography variant="h6">User Permissions</Typography>
                    </Grid>
                </Grid>   

                <Divider/>  

                <Grid className={classes.form2}>
                    <Grid container direction="row" justify="center">
                        <Button>Save</Button>
                    </Grid>
                </Grid>   
            </Grid>
        </Grid>
    );
}

export default UserAdd;