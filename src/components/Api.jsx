import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Api() {
    const [info, setInfo] = useState([])

    const apiKeyApi= `http://api.weatherstack.com/current?access_key=359cc21a2bb72e0202d5f59f7e13bc06&query=Tucuman`;

    const ApiKeyDecodifiked = async () => {
        const apiKey = await Axios.get(apiKeyApi)
        setInfo(apiKey)
    }
    
    useEffect(() => {
        ApiKeyDecodifiked()
    }, [])

    console.log(info.data.request.type)

    return (
        <div>
            {/* <p>{info.data.request.type}</p> */}
        </div>
    )
}
