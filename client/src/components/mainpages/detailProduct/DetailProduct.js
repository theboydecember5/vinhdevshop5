import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'

const DetailProduct = () => {

    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])
    const addCart = state.userAPI.addCart


    useEffect(() => {

        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }

    }, [params.id, products])

    // Must have because await to load product nếu không sẽ bị lỗi load
    if (detailProduct.length === 0) return null

    return (
        <>
            <div className='detail'>

                <img src={detailProduct?.images.url} alt='' />
                <div className='box-detail'>
                    <div className='row'>
                        <h2>{detailProduct.title}</h2>
                        <h2>#ID: {detailProduct.product_id}</h2>
                    </div>
                    <span>{detailProduct.price} USD</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to='/cart' className='cart'
                        onClick={() => addCart(detailProduct)}
                    >Buy Now</Link>
                </div>
            </div>

            <div>
                <h2>
                    Maybe you want to know !!!
                </h2>
                <div className='products'>
                    {
                        products.map(p => (
                            p.category === detailProduct.category ?
                                <ProductItem key={p._id} product={p} /> : null
                        ))
                    }
                </div>
            </div>

        </>
    )
}

export default DetailProduct