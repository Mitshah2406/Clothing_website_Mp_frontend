import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../context/ShopContext'
import dropdown_icon from '../Components/assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import all_product from '../Components/assets/all_product'
import p14_img from "../Components/assets/product_14.png";

const ShopCategory=(props)=>{
    const {filterProductsByGender}=useContext(ShopContext)
  
    const currentUrl = window.location.pathname.split('/')[1];
    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt=""/>
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt=""/>
                </div>
            </div>
            <div className="shopcategory-products">
                {filterProductsByGender(currentUrl =='mens' ? "MALE":"FEMALE").map((item,i)=>{
                    console.log(item._id)
              
                        return <Item key={i} id={item._id} name={item.productTitle} image={p14_img} new_price={item.productPrice} old_price={item.productPrice+200}/>
                  
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory