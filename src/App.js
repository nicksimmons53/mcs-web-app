import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route
} from 'react-router-dom';
import { 
  Container
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import colors from 'assets/colors';

const theme = createMuiTheme({
  palette: {
      primary: {
        main: colors.gunmetal
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

function App( ) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
          <Router>
            {
              <Switch>
                <Route path="/login" component={Login}/>

                <Route path="/profile" component={Profile}/>
              </Switch>
            }
          </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;