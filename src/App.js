import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from 'react-router-dom';
import { 
  Container,
  makeStyles
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import SalesProfile from './pages/Sales/SalesProfile';

const theme = createMuiTheme({
  palette: {
      primary: {
        main: '#1C1F33'
      },
      secondary: {
        main: '#E85F5C'
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
      backgroundColor: "#1C1F33",
      marginTop: 0,
      minHeight: "100vh",
      minWidth: "100vw"
  }
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root}>
          <Router>
            {
              <Switch>
                <Route path="/">
                  <SalesProfile/>
                </Route>
              </Switch>
            }
          </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;