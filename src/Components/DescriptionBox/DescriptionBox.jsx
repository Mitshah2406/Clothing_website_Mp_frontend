import React from 'react'
import './DescriptionBox.css'

const DescriptionBox=()=>{
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-navbox">
                    Description
                </div>
                <div className="descriptionbox-navbox fade">
                    Reviews (122)
                </div>
            </div>
            <div className="descriptionbox-description">
                <p>Static text</p>
                <p>theres some more text</p>
            </div>
        </div>
    )
}

export default DescriptionBox