// src/Navigation.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import BankingOverview from './components/BankingOverview';
import InvoicePage from './pages/InvoicePage';

const Navigation = () => {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Banking App
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Banking Overview
            </Button>
            <Button color="inherit" component={Link} to="/invoices">
              Invoices
            </Button>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/invoices">
            <InvoicePage />
          </Route>
          <Route path="/">
            <BankingOverview />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Navigation;