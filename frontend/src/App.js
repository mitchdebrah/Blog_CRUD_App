
import React from "react"
import Homepage from "./chapters/Homepage";
import Navbar from "./components/Navbar";
import Singlepage from "./chapters/Singlepage";
import Author from "./chapters/Author.jsx";
import SettingsAcct from "./chapters/SettingsAcct";
import Loginpage from "./chapters/Loginpage"
import Registerpage from "./chapters/Registerpage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "./medium/Context";





const  App = ()=> {
  const { user } = useContext(Context);
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/register">{user ? <Homepage /> : <Registerpage />}</Route>
        <Route path="/login">{user ? <Homepage /> : <Loginpage />}</Route>
        <Route path="/write">{user ? <Author /> : <Registerpage />}</Route>
        <Route path="/settings">{user ? <SettingsAcct /> : <Registerpage />}</Route>
        <Route path="/post/:postId">
          <Singlepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;