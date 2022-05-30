import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icon/bars-solid.svg'
import Close from './icon/square-xmark-solid.svg'
import Cart from './icon/cart-shopping-solid.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Header = () => {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')

        window.location.href = '/'
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to='/create_product'>Create Product</Link></li>
                <li><Link to='/category'>Category</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to='/history'>History</Link></li>
                <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }
    const toggleMenu = () => setMenu(!menu)
    const styleMenu = {
        left: menu ? 0 : '-100%'
    }

    return (

        <header>
            <div className='menu' onClick={() => setMenu(!menu)}>
                <img src={Menu} alt='menu' width='30' className='menu' />
            </div>
            <div className='logo'>
                <h1>
                    <Link to='/'>
                        {isAdmin ? 'Admin' : 'Vinhdev Shop'}
                    </Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li> <Link to='/'>{isAdmin ? 'Products' : 'Shop'}</Link> </li>

                {isAdmin && adminRouter()}
                {isLogged ? loggedRouter() : <li> <Link to='/login'>Login || Register</Link></li>}

                <li className='menu' onClick={() => setMenu(!menu)} > <i className="fa-solid fa-square-xmark" style={{ fontSize: '60px' }}></i></li>
            </ul>

            {
                isAdmin ? '' :
                    <div className='cart-icon'>
                        <span style={{ fontSize: '1rem' }}>{cart.length}</span>
                        <Link to='/cart'>
                            <img src={Cart} width='30' alt='cart' />
                        </Link>
                    </div>
            }

        </header >


    )
}

export default Header