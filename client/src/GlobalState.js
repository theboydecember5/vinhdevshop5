import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import CategoriesAPI from './api/CategoriesAPI'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(token)
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token')
                setToken(res.data.accesstoken)

                // In MongoDB set JWT time is 17s
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    }, [])

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}