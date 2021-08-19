
import './App.css';
import NavBar from './components/navbar/NavBar';
import HomePage from './pages/HomePage';
import Footer from './components/footer/Footer';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/profile/:id?" exact>
          <Profile />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
