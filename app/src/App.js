
import './App.css';
import NavBar from './components/navbar/NavBar';
import HomePage from './pages/HomePage';
import Footer from './components/footer/Footer';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile';
import ItemPage from './pages/ItemPage';
import CreateItem from './pages/CreateItem';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/item/:id?" exact>
          <ItemPage />
        </Route>
        <Route path="/profile/item/:id?" exact>
          <ItemPage />
        </Route>
        <Route path="/create" exact>
          <CreateItem />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
