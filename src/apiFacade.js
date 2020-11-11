const URL = "http://localhost:8080/CA3_3SEM/api/";

function getServicePoints(address) {
    const options = makeOptions("POST", false, address);
    return fetch(URL + "servicepoints/servicepoints", options)
        .then(handleHttpErrors);
}

const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
}
const getToken = () => {
    return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
}
const logout = () => {
    localStorage.removeItem("jwtToken");
}

const login = (user, password) => {
    const options = makeOptions("POST", false, { username: user, password: password });
    return fetch(URL + "login", options)
        .then(handleHttpErrors)
        .then(res => { setToken(res.token) })
}

const apiFacade = {
    getServicePoints,
    setToken,
    getToken,
    loggedIn,
    logout,
    login
}

function makeOptions(method, addToken, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
        }
    }
    if (addToken && loggedIn()) {
        opts.headers["x-access-token"] = getToken();
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

export default apiFacade;