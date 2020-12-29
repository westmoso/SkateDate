import React from "react";
import './App.css';
import Dashboard from './dashboard/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SocketProvider from 'react-socket.io';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3000');

export default function App() {
  return (
    <SocketProvider socket={socket}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </div>
    </SocketProvider>
  );
}

