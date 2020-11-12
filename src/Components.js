import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';
import AddressFetcher from './AddressFetcher';
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

export function AddressInfo({ address, isBlocking, handleChange }) {
    const [servicePoints, setServicePoints] = useState([]);

    const handleSubmit = event => {
        event.preventDefault();
        apiFacade.getServicePoints(address)
        .then(data => {
            setServicePoints(data.postnord.servicePointInformationResponse.servicePoints);
        })
    };

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

export function WeatherInfo({ address }) {
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

    useEffect(() => {
        apiFacade.getServicePoints(address)
            .then(data => {
                const temp = data.weather.data[0];
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
    }, [address])

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