import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import ProductItem from '../utils/productItem/ProductItem'
import Filter from './Filter'
import Loadmore from './Loadmore'


const Products = () => {

    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [isCheck, setIsCheck] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true)

            const destroyImg = axios.post('/api/destroy', { public_id }, {
                headers: { Authorization: token }
            })

            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token }
            })

            await destroyImg
            await deleteProduct
            setLoading(false)
            setCallback(!callback)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    if (loading) return <div className='products'><Loading /></div>

    return (
        <>
            {
                <Filter />
            }
            {
                isAdmin && <div className='delete-all'>
                    <span>Select All</span>
                    <input type='checkbox' checked={isCheck} onClick={checkAll} />
                    <button onClick={deleteAll}>Delete All</button>
                </div>
            }

            <div className='products'>
                {
                    products.map(product => (
                        <ProductItem key={product._id} product={product}
                            isAdmin={isAdmin} handleCheck={handleCheck} deleteProduct={deleteProduct}
                        />
                    ))
                }
            </div>
            <Loadmore />
            {products.length === 0 && <h2>There is no product !</h2>}

        </>
    )
}

export default Products