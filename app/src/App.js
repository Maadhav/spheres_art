import "./App.css";
import NavBar from "./components/navbar/NavBar";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer/Footer";
import { Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import ItemPage from "./pages/ItemPage";
import CreateItem from "./pages/CreateItem";
import React, { useEffect } from "react";
import { deploy } from "./adapters/tezos/deploy";

function App() {

  useEffect(() => {
  }, []);
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/profile/item/:id?" component={ItemPage}/>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/item/:id?" component={ItemPage}/>
        <Route path="/create" >
          <CreateItem />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
