import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import SkaterCard from "./Components/SkaterCard";
import Header from "./Components/Header"
import SwipeButtons from "./Components/SwipeButtons"


export default function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            {/* <SignUp path="/SignUp" /> */}
            <SignIn path="/SignIn" />
            <Route path='/'>
              <SkaterCard />
            </Route>
          </Switch>
        </Router>
        <SwipeButtons />
      </div>
    </>
  );
}

