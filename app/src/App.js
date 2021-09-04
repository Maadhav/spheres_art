import "./App.css";
import NavBar from "./components/navbar/NavBar";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer/Footer";
import { Route, Switch, useLocation } from "react-router-dom";
import Profile from "./pages/Profile";
import ItemPage from "./pages/ItemPage";
import CreateItem from "./pages/CreateItem";
import React, { useEffect, useRef } from "react";
import MyCreation from "./pages/MyCreation";
import About from "./pages/About";
// import { deploy } from "./adapters/tezos/deploy";

function App() {
  var location = useLocation()
  useEffect(() => {
    window.scroll(0, 0)
  }, [location]);
  return (
    <div id="home">
      {!location.pathname.includes('/about') && <NavBar />}
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/about">
          <About />
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
