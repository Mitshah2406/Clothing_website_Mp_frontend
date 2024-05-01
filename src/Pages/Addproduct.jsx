import React from 'react'
import './CSS/Addproduct.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Addproduct = () => {
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Extracting data from the form
        const productTitle = formData.get('productTitle');
        const productDescription = formData.get('productDescription');
        const stockAvailable = parseInt(formData.get('stockAvailable'));
        const productPrice = parseInt(formData.get('productPrice'));
        const category = formData.get('category');
        const subCategory = formData.get('subCategory');
        const productColors = formData.get('productColors');
        const gender = formData.get('gender');

        // Extracting selected product sizes
        const productSizes = "";
        console.log(formData.getAll('productSizes'));
        formData.getAll('productSizes').forEach((size,i) => {
            if (i ===0){

                productSizes.concat(size);
            }
                productSizes.concat(","+size);
    
        });

        // Creating an array of product images
        const productImages = [];
        formData.getAll('productImages').forEach(image => {
            productImages.push(image);
        });

        // Creating the product object in the desired format
        const newProduct = {
            productTitle,
            productDescription,
            stockAvailable,
            productPrice,
            productImages,
            category,
            subCategory,
            productColors,
            productSizes,
            gender
        };

        try {
            // Send the new product data to the server
            const response = await axios.post('https://clothing-webapp.onrender.com/product/addProduct', newProduct);
            console.log('Product added successfully:', response.data);
            toast.success('Product added successfully');

        } catch (error) {
            toast.error('Error adding product');
            console.error('Error adding product:', error);
        }

        
        
    }

    return (
        <div className='addproduct'>
                <form onSubmit={handleAddProduct} className='addproduct-container'>
                    <h1>Add a new product</h1>
                    <div className='product-details'>
                        <input type="text" placeholder="Product-Name" name='productTitle' />
                        <input type="text" placeholder="Product-Description" name="productDescription" />
                    </div>
                    <div className='product-price-availability'>
                        <div><input type="number" placeholder='Stock-Available' name='stockAvailable' /></div>
                        <div><input type='number' placeholder='Price-per-item' name="productPrice" /></div>
                    </div>
                    <div className='product-category'>
                        <div><input type='text' placeholder='Product-Category' name="category" /></div>
                        <div><input type='text' placeholder='Product-Subcategory' name="subCategory" /></div>
                    </div>
                    <div className='product-size'>
                        <p>Product-Sizes Available</p>
                        <div className='size-choices'>
                            <div>
                            <input type='checkbox' name='productSizes' value="Small" />
                                <label htmlFor='Small'>Small</label>
                            </div>
                            <div>
                            <input type='checkbox' name='productSizes' value="Medium" />
                                <label htmlFor='Medium'>Medium</label>
                            </div>
                            <div>
                            <input type='checkbox' name='productSizes' value="Large" />
                                <label htmlFor='Large'>Large</label>
                            </div>
                            <div>
                            <input type='checkbox' name='productSizes' value="XL" />
                                <label htmlFor='XL'>XL</label>
                            </div>
                            <div>
                                <input type='checkbox' name='productSizes' value="XXL"/>
                                <label htmlFor='XXL'>XXL</label>
                            </div>
                        </div>
                    </div>

                    <div className='product-gender-color'>
                        <input type='text' name="productColors" placeholder='Product-color' />
                        <input type='text' name='gender' placeholder='Gender' />
                    </div>
                    <div className='product-image'>
                        <p>Product-Image</p>
                        <input type='file' placeholder='Product-image' name="productImages" accept='image/*' />
                    </div>
               
                <button type="submit">ADD</button>
            </form>
        </div>
    )
}

export default Addproduct;

