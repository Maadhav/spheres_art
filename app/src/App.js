import "./App.css";
import NavBar from "./components/navbar/NavBar";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer/Footer";
import { Route, Switch, useLocation } from "react-router-dom";
import Profile from "./pages/Profile";
import ItemPage from "./pages/ItemPage";
import CreateItem from "./pages/CreateItem";
import React, { useEffect, useRef, useState } from "react";
import MyCreation from "./pages/MyCreation";
import HowItWork from "./pages/HowItWork";
import Contact from "./pages/Contact";
import TOS from "./pages/TOS";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { deploy } from "./adapters/tezos/deploy";
import { AuthService } from "./adapters/firebase";

function App() {
  var location = useLocation()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // deploy();
    AuthService.signin().then(val => {
      setLoading(false);
    })
    window.scroll(0, 0)
  }, [location]);
  if (loading)
    return <div />
  return (
    <div id="home">
      {!location.pathname.includes('/howitwork') && <NavBar />}
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/howitwork">
          <HowItWork />
        </Route>
        <Route path="/contactus">
          <Contact />
        </Route>
        <Route path="/tos">
          <TOS />
        </Route>
        <Route path="/privacy">
          <PrivacyPolicy />
        </Route>
        <Route path="/mycreation">
          <MyCreation />
        </Route>
        <Route path="/item/:id?" component={ItemPage} />
        <Route path="/create" >
          <CreateItem />
        </Route>
      </Switch>
      {!location.pathname.includes('/about') && <Footer />}
    </div>
  );
}

export default App;
