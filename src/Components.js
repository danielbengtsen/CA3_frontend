import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';
import AddressFetcher from './AddressFetcher';
import apiFacade from './apiFacade';

export function Home() {
    return (
        <h2>Home</h2>
    );
}

export function AddressInfo({ address, isBlocking, handleChange, handleSubmit }) {
    return (
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