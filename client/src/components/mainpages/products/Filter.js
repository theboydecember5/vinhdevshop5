import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

const Filter = () => {

    const state = useContext(GlobalState)
    const [categories, setCategories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = (e) => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className='filter_menu'>
            <div className='row'>
                <span>Filter: </span>
                <select name='category' value={category} onChange={handleCategory} style={{ padding: '0 10px', height: '40px', marginLeft: '10px' }}>
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
            <input type='text' value={search} placeholder='Enter your search!'
                onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className='row'>
                <span>Sort By: </span>
                <select name='sort' value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '0 10px', height: '40px', marginLeft: '10px' }}>
                    <option value=''>Mới nhất</option>
                    <option value='sort=oldest'>Cũ nhất</option>
                    <option value='sort=-sold'>Best Sales</option>
                    <option value='sort=-price'>Price: Hight-Low</option>
                    <option value='sort=price'>Price: Low-Hight</option>
                </select>
            </div>

        </div >
    )
}

export default Filter