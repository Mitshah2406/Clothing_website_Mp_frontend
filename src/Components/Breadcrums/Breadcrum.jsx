import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../assets/breadcrum_arrow.png';

const Breadcrum=(props)=>{
    const {product}=props;
    return (
        <div className='breadcrum'>
            Home <img src={arrow_icon} alt=""/> Shop <img  src={arrow_icon} alt=""/> {product.category}<img src={arrow_icon} alt=""/> {product.subCategory}
        </div>
    )
}

export default Breadcrum