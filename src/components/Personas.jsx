import React from 'react'
import { useState } from 'react'

export default function Personas() {
    const [persona, setPersona] = useState([])
    const [name, setName] = useState('')
    const listo= persona.map((p,i) => <p key={i}>{p}</p>)
    const subir = () =>{
        const array = [...persona, name]
        setPersona(array)
    }
    const guardar = (e) =>{
        setName(e.target.value)
    }
    return (
        <>
            <ul>{listo}</ul>
            <input type="text" onChange={guardar} />
            <button className="btn btn-danger" onClick={subir}>Click Me</button>
        </>
    )
}
