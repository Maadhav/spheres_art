import "./App.css";
import NavBar from "./components/navbar/NavBar";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer/Footer";
import { Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import ItemPage from "./pages/ItemPage";
import CreateItem from "./pages/CreateItem";
import { getActiveAccount, getContractStorage } from "./adapters/tezos/index";
import { useEffect, useState } from "react";
import { deploy } from "./adapters/tezos/deploy";

function App() {

  const [spheres, setSpheres] = useState([])
  useEffect(() => {
    async function fetchStorage() {
      let storage = await getContractStorage();
      let data = storage.spheres.valueMap;
      let spheres = [];
      data.forEach((sphere) => {
        spheres.push(sphere);
      });
      setSpheres(spheres);
    }
    fetchStorage();
  }, []);
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/item/:id?" component={ItemPage}/>
        <Route path="/profile/item/:id?" component={ItemPage}/>
        <Route path="/create" >
          <CreateItem />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
