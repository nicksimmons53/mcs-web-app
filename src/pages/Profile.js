import React from 'react';
import { 
    Grid, 
    makeStyles
} from '@material-ui/core';
import _ from 'lodash';
import colors from 'assets/colors';
import NavBar from 'components/NavBar';
import NavDrawer from 'components/NavDrawer';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Login from './Login';
import Loading from 'components/Loading';
import userAPI from 'api/userAPI';
import { 
    BrowserRouter as Router,
    Switch, 
    Route
} from 'react-router-dom';
import Sales from 'pages/Sales/Sales';
import UserAdd from './Admin/UserAdd';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#EBEDEF",
        left: 0,
        marginTop: 0,
        minHeight: "100vh",
        minWidth: "100%",
        padding: 0, 
        position: 'absolute',
        zIndex: 0
    },
    content: {
        flexGrow: 1,
        marginLeft: 350,
        zIndex: 1
    },
    link: {
        alignItems: "center",
        color: colors.burnt_sienna,
        display: "flex",
        fontWeight: "bold"
    }
}));

function Profile( ) {
    const classes = useStyles( );
    const { user, isAuthenticated } = useAuth0( );
    let [ userInfo, setUserInfo ] = React.useState( );

    userAPI.retrieveInfo(user.email)
        .then((res) => {
            let info = _.merge(user, res.data.Item);
            setUserInfo(info);
            localStorage.setItem("user", JSON.stringify(info));
        });

    if (!isAuthenticated) {
        return <Login/>;
    }
    
    if (userInfo === undefined) {
        return <Loading/>;
    }
    
    return (
        <Grid className={classes.root}>
            <NavBar user={userInfo}/>

            <NavDrawer user={userInfo}/>

            <Grid className={classes.content}>
                <Switch>
                    <Route path="/profile/modules/accounting" component={Loading}/>

                    <Route path="/profile/modules/expediting" component={Loading}/>

                    <Route path="/profile/modules/sales" component={Sales}/>
                    
                    <Route path="/profile/settings" component={Loading}/>

                    <Route path="/profile/admin/add_user" component={UserAdd}/>
                </Switch>
            </Grid>
        </Grid>
    );
}

export default withAuthenticationRequired(Profile, {
    onRedirecting: ( ) => <Loading/>
});
