import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import history from './services/history';
import Global from './styles/global';
import Header from './components/Header';
import Routes from './routes';

function App() {
  return (
    <Router history={history}>
      <Header />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Routes />
      </MuiPickersUtilsProvider>
      <Global />
      <ToastContainer autoClose={3000} />
    </Router>
  );
}

export default App;
