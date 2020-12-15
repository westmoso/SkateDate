import React from 'react'
import SkaterCard from "../Components/SkaterCard"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function notes() {
    return (
        <div className="fakeapp">
            <Header />
            <h1>Fake App</h1>
            <Router>
                <Switch>
                    <Route path="/chat">
                        <h1>i am the chat page</h1>
                    </Route>
                    <Route path="/">
                        <SkaterCard />
                    </Route>
                </Switch>
            </Router>
            {/* {header} <Sidebar />
            {skatercards}
            {buttons}
            {chats}
            {individualchat}*/}


        </div>
    );
}

export default notes
