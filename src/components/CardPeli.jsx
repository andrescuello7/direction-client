import React from 'react'

export default function CardPeli(props) {
    return (
        <div className="CardDePeli">
            <div>
                <div className="titleCard">
                    <p>{props.Title}</p>
                </div>
                <img className="imgPeli" src={props.Imagen} alt=""/>
            </div>
        </div>
    )
}
