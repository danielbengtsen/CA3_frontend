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
  useHistory
} from "react-router-dom";
import React, { useState } from 'react';
import AddressFetcher from './AddressFetcher';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = status =>
  {
    setIsLoggedIn(status);
    history.push("/");
  };
  
  return (
    <Router>
      <div>
        <Header 
          loginMsg={isLoggedIn ? "Logout" : "Login"}
          isLoggedIn={isLoggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/address-info">
            <AddressInfo />
          </Route>
          <Route path="/login-out">
            <Login
              loginMsg={isLoggedIn ? "Logout" : "Login"}
              isLoggedIn={isLoggedIn}
              setLoginStatus={setLoginStatus}
            />
          </Route>
          <Route component={NoMatch}></Route>
        </Switch>
      </div>
    </Router>
  );
}

function Header({isLoggedIn, loginMsg})
{
  return(
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

function Home()
{
  return(
    <h2>Home</h2>
  );
}

function AddressInfo()
{
  const initialValue = {
    city: "",
    postalCode: "",
    streetName: "",
    streetNumber: ""
  }
  const [address, setAddress] = useState(initialValue);
  let [isBlocking, setIsBlocking] = useState(false);

  const handleChange = event => 
  {
    const {id, value} = event.target;
    setIsBlocking(event.target.value.length > 0);
    setAddress({...address, [id]: value})
  };

  const handleSubmit = event => 
  {
    event.preventDefault();
    setIsBlocking(false);
    alert(JSON.stringify(address));

  };

  return(
    <div>
      <h2>What's the address?</h2>
      <div>
      <form>
          <Prompt when={isBlocking} message={() => "You have unsaved data. Press \"Cancel\" to keep your changes."} />
          <input type="text" id="city" value={address.city} placeholder="City..." onChange={handleChange} />
          <br></br>
          <input type="text" id="postalCode" value={address.postalCode} placeholder="Zip..." onChange={handleChange} />
          <br></br>
          <input type="text" id="streetName" value={address.streetName} placeholder="Street..." onChange={handleChange} />
          <br></br>
          <input type="text" id="streetNumber" value={address.streetNumber} placeholder="Street number..." onChange={handleChange} />
          <br></br>
          <input type="submit" value="Enter" onClick={handleSubmit} />
        </form>
        <AddressFetcher address={address} />
      </div>
    </div>
  );
}

function NoMatch()
{
  return(
    <div>
      <h2>Sorry, we couldn't find that page...</h2>
    </div>
  );
}

function Login({isLoggedIn, loginMsg, setLoginStatus})
{
  const handleBtnClick = () =>
  {
    setLoginStatus(!isLoggedIn);
  };

  return (
    <div>
      <h2>{loginMsg}</h2>
      <button onClick={handleBtnClick}>{loginMsg}</button>
    </div>
  );
}

export default App;
