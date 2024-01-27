import React from 'react'

const CarouselItem = ({ url }) => {
    return (
        <div className="slider-item">
            <img src={url} />
        </div>
    )
}

export default CarouselItem
