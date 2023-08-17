import React from 'react'
import "./NotFound.css"
import NotFoundImg from "../../assets/icons/no-results.png"

const NotFound = () => {
    return (
        <div className='container'>
            <div className='not-found-image-container'>
                <img src={NotFoundImg} />
            </div>
            <div className='not-found-label'>
                <p>Oops.. Sorry we couldnot find that page!</p>
            </div>
        </div>
    )
}

export default NotFound