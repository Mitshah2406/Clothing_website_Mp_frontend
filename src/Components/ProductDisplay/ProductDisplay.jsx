import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'
import p_14 from '../assets/product_14.png'
const ProductDisplay=(props)=>{
    const {product}=props;
    const {addToCart}=useContext(ShopContext)
    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={p_14} alt=""/>
                    <img src={p_14} alt=""/>
                    <img src={p_14} alt=""/>
                    <img src={p_14} alt=""/>
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={p_14} alt=""/>
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.productTitle}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_dull_icon} alt=""/>
                    <p>(122)</p>
                </div>
                <div className='productdislay-right-prices'>
                    <div className="productdisplay-right-price-old">
                        ${product.productPrice+200}
                    </div>
                    <div className="productdislay-right-price-new">
                        ${product.productPrice}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    {product.productDescription}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-size">
                     {
                            product.productSizes.map((size,i)=>{
                                return <div key={i} className="productdisplay-right-size-box"
                                >{size}</div>
                            })
                     }
                    </div>
                </div>
                <button onClick={()=>{addToCart(product._id)}}>ADD TO CART</button>
                <p className='product-dislay-right-category'><span>Category :</span>{product.category}, {product.subCategory}</p>
                <p className='product-dislay-right-category'><span>Tags :</span>{product.productType}, {product.gender}</p>

            </div>
        </div>
    )
}

export default ProductDisplay