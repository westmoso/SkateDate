import React from "react";
import './App.css';
import Sidebar from "./Components/Sidebar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SkaterCard from "./Components/SkaterCard";



function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Sidebar />
          <Switch>
            <Route path='/'>
              <SkaterCard />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
