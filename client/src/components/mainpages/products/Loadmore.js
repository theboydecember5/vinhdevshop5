import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'

const Loadmore = () => {

    const state = useContext(GlobalState)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    return (
        <div className='load_more'>
            {
                result < page * 9 ? '' :
                    <button onClick={() => setPage(page + 1)}>Loadmore</button>
            }
        </div>
    )
}

export default Loadmore