import React from "react";
import './App.css';
import Dashboard from './dashboard/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

