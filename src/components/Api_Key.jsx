import React from 'react'
import { useState, useEffect } from 'react'
// import Axios from 'axios'; 

export default function Api_Key() {
    const [date, setDate] = useState([]);
    const [dato, setDato] = useState([]);
    const [datu, setDatu] = useState([]);
    const [input, setInput] = useState([]);
    const [ouput, setOuput] = useState('Buenos Aires');

    const apiWeb = `http://api.weatherstack.com/current?access_key=359cc21a2bb72e0202d5f59f7e13bc06&query=${ouput}`
    
    console.log('ouput', ouput)

    const ApiDataState = async () => {
        try{
            const data = await fetch(apiWeb)
            const dataTeKey = await data.json()
            setDate(dataTeKey.location)
            setDato(dataTeKey.current)
            setDatu(dataTeKey.request)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        ApiDataState()
        setOuput(ouput)
    }, [ouput])

    // Datos de Input
    const subirInput = (e) => {
        setInput(e.target.value)
    }

    const subir = () => {
        setOuput(input)
    }

    return (
        <div className="card">
            <div>
                <input type="text" className="pad mr-sm-2" placeholder="Localidad, Provincia" onChange={subirInput} />
                <button className="btn btn-danger" onClick={subir}>Buscar</button>
            </div>
            <div>
                <p>Region: {datu.query}</p>
                <p>Ciudad: {date.timezone_id}</p>
                <p>Temperatura: {dato.temperature}</p>
                <p>Humedad: {dato.humidity}</p>
            </div>
        </div>
    )
}
