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
  let [isBlocking, setIsBlocking] = useState(false);

  const handleChange = event => 
  {
    // TODO: Add code here
    setIsBlocking(event.target.value.length > 0);
  };

  const handleSubmit = event => 
  {
    event.preventDefault();
    // TODO: Add code here
    setIsBlocking(false);
  };

  return(
    <div>
      <h2>What's the address?</h2>
      <div>
      <form>
          <Prompt when={isBlocking} message={() => "You have unsaved data. Press \"Cancel\" to keep your changes."} />
          <input type="text" id="country" value="" placeholder="Country..." onChange={handleChange} />
          <br></br>
          <input type="text" id="city" value="" placeholder="City..." onChange={handleChange} />
          <br></br>
          <input type="text" id="zip" value="" placeholder="Zip..." onChange={handleChange} />
          <br></br>
          <input type="text" id="street" value="" placeholder="Street..." onChange={handleChange} />
          <br></br>
          <input type="text" id="streetNumber" value="" placeholder="Street number..." onChange={handleChange} />
          <br></br>
          <input type="submit" value="Enter" onClick={handleSubmit} />
        </form>
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
