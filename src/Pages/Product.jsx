import React, { useContext } from 'react'
import {ShopContext} from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product=(props)=>{
    const {filterProductsByGender}=useContext(ShopContext);
    const all_product=filterProductsByGender("");

    const {_id}=useParams();
    
    const product=all_product.find((e)=>e._id=== _id);
    console.log("Product");
    console.log(product);
    return (

        <div>
            <Breadcrum product={product}/>
            <ProductDisplay product={product}/>
            <DescriptionBox/>
            <RelatedProducts/>
        </div>
    )
}

export default Product