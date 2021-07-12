import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect
} from 'react-router-dom';
import { 
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { setAuth0User } from "features/user/userSlice";
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import NavBar from 'components/NavBar';
import NavDrawer from 'components/NavDrawer';
import colors from 'assets/colors';
import Loading from 'components/Loading';

const theme = createMuiTheme({
  palette: {
      primary: {
        main: colors.ghost_white
      },
      secondary: {
        main: colors.burnt_sienna
      },
      error: {
        main: '#E85F5C'
      },
      warning: {
        main: '#064789'
      },
      info: {
        main: '#D1D1D1'
      },
      success: {
        main: '#04724D'
      }
  }
});

const useStyles = makeStyles({
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
  screen: {
    marginLeft: 350
  }
})

function App( ) {
  const classes = useStyles( );
  const { user, isAuthenticated, isLoading } = useAuth0( );
  const dispatch = useDispatch( );

  if (isLoading) {
      return <Loading/>;
  } else {
      dispatch(setAuth0User(user));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
          <Router>
            {
              <Switch>
                <Route path="/login">
                  <Login/>
                </Route>
                <Route>
                  <Grid className={classes.root}>
                    <NavBar/>
                    
                    <NavDrawer/>

                    <Grid className={classes.screen}>
                      <Route path="/profile">
                        <Profile/>
                      </Route>
                      <Route path="/modules">
                        <Loading/>
                      </Route>
                      <Route path="/settings">
                        <Loading/>
                      </Route>
                    </Grid>
                  </Grid>
                </Route>
              </Switch>
            }
          </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;