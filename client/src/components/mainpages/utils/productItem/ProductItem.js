import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BtnRender from './BtnRender'

const ProductItem = ({ product, isAdmin, handleCheck, deleteProduct }) => {


    return (
        <div className='product_card'>

            {
                isAdmin &&
                <input type='checkbox' checked={product.checked}
                    onChange={() => handleCheck(product._id)}
                />
            }

            <img src={product.images.url} alt='imageProduct' />

            <div className='product_box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>{product.price} USD</span>
                <p>{product.description}</p>
            </div>

            <BtnRender product={product} deleteProduct={deleteProduct} />

        </div>
    )
}

export default ProductItem