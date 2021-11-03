import {BrowserRouter, Switch, Route} from "react-router-dom"
import Dashboard from './views/Dashboard';
import Details from './views/Details';
import Create from './views/Create';
import Update from './views/Update';
import Login from './views/Login';
import './App.css';



function App() {

  return (
    <BrowserRouter>
      <fieldset>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/new">
            <Create />
          </Route>
          <Route exact path="/list">
            <Dashboard />
          </Route>
          <Route exact path="/trackers/:id">
            <Details />
          </Route>
          <Route exact path="/trackers/:id/edit">
            <Update />
          </Route>
        </Switch>
      </fieldset>
    </BrowserRouter>
  );
}

export default App;
