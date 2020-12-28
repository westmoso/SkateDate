import React from "react";
import './App.css';
import dashboard from './dashboard/dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" exact component={dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

