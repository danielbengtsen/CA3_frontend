import React, { useEffect, useState } from 'react';
import { Prompt, Link } from 'react-router-dom';
import apiFacade from './apiFacade';

export function Home() {
    return (
        <h2>Home</h2>
    );
}

export function Login({ login }) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = (evt) => {
        evt.preventDefault();
        login(loginCredentials.username, loginCredentials.password);
    }
    const onChange = (evt) => {
        setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
    }
    return (
        <div>
            <h2>Login here</h2>
            <form onChange={onChange}>
                <input placeholder="Username" id="username" />
                <input placeholder="Password" id="password" />
                <button onClick={performLogin}>Login</button>
            </form>
        </div>
    )
}

export function LoggedIn() {
    return (
        <div>
            <h2>You are now logged in!</h2>
        </div>
    )
}

export function Movies() {

    const [movieSearchWord, setMovieSearchWord] = useState("");
    const [movieArray, setMovieArray] = useState([]);

    const handleSubmit = event => {
        event.preventDefault();
        apiFacade.getMovieReviews(movieSearchWord)
        .then(data => {
            console.log(data)
            const array = data.results;
            setMovieArray(array);
        })
      };


      const allMovies = movieArray.map((movie, index)=> (
        <div>
        <ul key={index+1}>
            <li>{movie.display_title} - <a href={movie.link.url}>Details</a></li>
            <p>Review Summary: {movie.summary_short}</p>
        </ul>
        <hr></hr>
        </div>
        )
    );

    return (
        <div>
        <div>
            <input placeholder="Enter movie title" onChange={(event) => setMovieSearchWord(event.target.value)}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        <div>
            {allMovies}
        </div>
        </div>
    );
}

export function Address() {
    const initialWeather = {
        Sunrise: "",
        Sunset: "",
        Datetime: "",
        Cityname: "",
        Temperature: "",
        ApparentTemperature: "",
        Description: ""
      }
      const [weather, setWeather] = useState(initialWeather);
    
      const initialValue = {
        city: "",
        postalCode: "",
        streetName: "",
        streetNumber: ""
      }
    
      const [address, setAddress] = useState(initialValue);
      const [servicePoints, setServicePoints] = useState([]);
      let [isBlocking, setIsBlocking] = useState(false);
    
      const handleChange = event => {
        const { id, value } = event.target;
        setIsBlocking(event.target.value.length > 0);
        setAddress({ ...address, [id]: value })
      };
    
      const handleSubmit = event => {
        event.preventDefault();
        apiFacade.getServicePoints(address)
        .then(data => {
          const temp = data.weather.data[0];
          setServicePoints(data.postnord.servicePointInformationResponse.servicePoints);
          setWeather({
            Sunrise: temp.sunrise,
            Sunset: temp.sunset,
            Datetime: temp.datetime,
            Cityname: temp.city_name,
            Temperature: temp.temp,
            ApparentTemperature: temp.app_temp,
            Description: temp.weather.description
          })
        })
      };

      return (
          <div>
            <AddressInfo isBlocking={isBlocking} handleChange={handleChange} handleSubmit={handleSubmit} servicePoints={servicePoints} />
            <WeatherInfo weather={weather} />
          </div>
      )
}

export function AddressInfo({isBlocking, handleChange, handleSubmit, servicePoints }) {
    

    const allServicePoints = servicePoints.map(servicePoint => (
        <ul key={servicePoint.servicePointId}>
            <li>{servicePoint.servicePointId}</li>
            <li>{servicePoint.name}</li>
        </ul>
        )
    );

    return (
        <div>
            <h2>What's the address?</h2>
            <div>
                <form onChange={handleChange}>
                    <Prompt when={isBlocking} message={() => "You have unsaved data. Press \"Cancel\" to keep your changes."} />
                    <input type="text" id="city" placeholder="City..." />
                    <br></br>
                    <input type="text" id="postalCode" placeholder="Zip..." />
                    <br></br>
                    <input type="text" id="streetName" placeholder="Street..." />
                    <br></br>
                    <input type="text" id="streetNumber" placeholder="Street number..." />
                    <br></br>
                    <input type="submit" value="Enter" onClick={handleSubmit} />
                </form>
            </div>
            {allServicePoints}
        </div>
    );
}

export function WeatherInfo({ weather }) {
    return (
        <div>
            <h2>Weather goes here</h2>
            <Log value={weather} />
        </div>
    )
}

const Log = ({ value, replacer = null, space = 2 }) => (
    <pre>
        <code>{JSON.stringify(value, replacer, space)}</code>
    </pre>
)

export function NoMatch() {
    return (
        <div>
            <h2>Sorry, we couldn't find that page...</h2>
        </div>
    );
}