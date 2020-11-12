import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch,
  Prompt,
} from "react-router-dom";
import React, { useState } from 'react';
import {
  Home,
  AddressInfo,
  NoMatch,
  WeatherInfo,
  Login,
  LoggedIn
} from './Components';
import apiFacade from './apiFacade';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const initialValue = {
    city: "",
    postalCode: "",
    streetName: "",
    streetNumber: ""
  }

  const [address, setAddress] = useState(initialValue);

  let [isBlocking, setIsBlocking] = useState(false);

  const handleChange = event => {
    const { id, value } = event.target;
    setIsBlocking(event.target.value.length > 0);
    setAddress({ ...address, [id]: value })
  };

  const logout = () => {
    apiFacade.logout()
    setLoggedIn(false)
  }

  const login = (user, pass) => {
    apiFacade.login(user, pass)
      .then(res => {
        setLoggedIn(true)
        setError('');
      })
      .catch(err => {
        setError("Couldn't log you in, see error in console for further information");
        console.log(err);
      })
  }

  return (
    <Router>
      <div>
        <Header
          loginMsg={loggedIn ? "Logout" : "Login"}
          isLoggedIn={loggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/address-info">
            <AddressInfo address={address} isBlocking={isBlocking} handleChange={handleChange} />
            <WeatherInfo address={address} />
          </Route>
          <Route path="/login-out">
          <div>
            {!loggedIn ? (<Login login={login} />) :
            (<div>
              <LoggedIn />
              <button onClick={logout}>Logout</button>
            </div>)}
            
            {error}
          </div>
          </Route>
          <Route component={NoMatch}></Route>
        </Switch>
      </div>
    </Router>
  );
}

function Header({ isLoggedIn, loginMsg }) {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/address-info">Address Info</NavLink></li>
      {
        isLoggedIn &&
        (
          <React.Fragment>
            {//Add list elements here only available to logged in users (remove the "{" "}")
            }
          </React.Fragment>
        )
      }
      <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
    </ul>
  );
}

export default App;
