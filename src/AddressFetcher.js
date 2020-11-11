import { useState } from 'react';
const URL = "http://localhost:8080/CA3_3SEM/api/postnord/test";

export function AddressFetcher() {

    const [name, setName] = useState([]);
    const [servicePointId, setServicePointId] = useState([]);

    function getAddress() 
    {
        var opts = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }
        fetch(URL, opts)
        .then(res => res.json())
        .then(data => {
            setName(data.servicePointInformationResponse.servicePoints[0].name);
            setServicePointId(data.servicePointInformationResponse.servicePoints[0].servicePointId)
        })
    }

    return (
        <div>
            <button onClick={getAddress}>Get Address</button>
            <p>{servicePointId}</p>
            <p>{name}</p>
        </div>
    )
}

export default AddressFetcher;