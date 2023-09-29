import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './navbar.css'
import { setLogout } from '../redux/auth';
export default function Navbar() {
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  return (
    <div className='navbar'>
        <p>Welcome <b>{user.name}</b></p>
        <div className='navbar-cart'>
            <i class="fa-solid fa-cart-shopping"><span className='cart-notch'>{cart?.length === 0 ? "" : cart?.length}</span></i>
        </div>
        <button className='logout-btn' onClick={() => {
            dispatch(setLogout());
        }}>Logout</button>
    </div>
  )
}
