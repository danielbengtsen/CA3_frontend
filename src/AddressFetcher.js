import { useState } from 'react';
const URL = "http://localhost:8080/CA3_3SEM/api/servicepoints/servicepoints";

export function AddressFetcher() {

    const [servicePointName, setServicePointName] = useState([]);
    const [servicePointId, setServicePointId] = useState([]);
    const [servicePoints, setServicePoints] = useState([]);

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
            servicePoints.forEach(index => {
                setServicePointName(data.postnord.servicePointInformationResponse.servicePoints[index].name);
                setServicePointId(data.postnord.servicePointInformationResponse.servicePoints[index].servicePointId);
            });
            setServicePoints(data.postnord.servicePointInformationResponse.servicePoints);
        })
    }

    const allServicePoints = servicePoints.map(servicePoint => (
        <ul key={servicePoint.servicePointId}>
            <li>{servicePoint.servicePointId}</li>
            <li>{servicePoint.name}</li>
        </ul>
        )
    );

    return (
        <div>
            <button onClick={getAddress}>Get Address</button>
            <div>
                {allServicePoints}
            </div>
        </div>
    )
}

export default AddressFetcher;