import React from "react";
import './App.css';
import Sidebar from "./Components/Sidebar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import SkaterCard from "./Components/SkaterCard";



export default function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Sidebar />
          <Switch>
            {/* <SignUp path="/SignUp" /> */}
            <SignIn path="/SignIn" />
            <Route path='/'>
              <SkaterCard />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

