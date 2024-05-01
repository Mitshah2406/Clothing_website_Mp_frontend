import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext=createContext(null);

const getDefaultCart=(all_product)=>{
    let cart={};
    console.log(all_product);
    for(let index=0; index<all_product.length+1; index++){
        cart[index]=0;
    }
    return cart;
}

const ShopContextProvider=(props)=>{

    const [all_product, setAllProducts] = useState([]);
    const [cartItems,setCartItems]=useState(getDefaultCart(all_product))
   useEffect(()=>{
       const getAllProducts = async () => {

    
           axios.get("https://clothing-webapp.onrender.com/product/getAllProducts", { "Content-Type": "application/json" }).then((res) => {
            //    console.log(res.data);
               setAllProducts(res.data)
           })

       }

       getAllProducts();
   }, [])
    const filterProductsByGender = (value) =>{

        if(value==""){
            return all_product;
        }
        return all_product.filter(product => product["gender"] === value);
    }
    const addToCart=(itemId)=>{
        console.log(itemId);
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }

    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=all_product.find((product)=>product._id===item);
                totalAmount += itemInfo.new_price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems=()=>{
        console.log("Cart items");
        console.log(cartItems);
        let totalItem=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem=+cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue={getTotalCartItems,getTotalCartAmount,filterProductsByGender,all_product,cartItems,addToCart,removeFromCart}
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider