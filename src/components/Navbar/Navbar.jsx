import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrowIcon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const {setCurrency} = useContext(CoinContext);
    // eslint-disable-next-line no-unused-vars
    const currencyHandler = (event)=>{
        switch(event.target.value){
            case 'usd':
                setCurrency({name:'usd',symbol:"$"});
                break;
            case 'inr':
                setCurrency({name:"inr",symbol:"₹"});
                break;
            case 'eur':
                setCurrency({name:"eur",symbol:"€"});
                break;
            default :
                setCurrency({name:'usd',symbol:"$"});
                break;
        }
    }
  return (
    <div className='navbar'>
        <Link to={'/'}><img className='logo' src={logo} alt="" /></Link>
        <ul>
            <Link to={'/'}><li>Home</li></Link>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className='nav-right'>
            <select onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="eur">EURO</option>
            </select>
            <button>Sign Up <img src={arrowIcon} alt="" /></button>
        </div>
    </div>
  )
}

export default Navbar