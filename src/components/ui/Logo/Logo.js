import React from 'react'
import classes from './Logo.module.css'

import burgerLogo from '../../../assets/images/burger.png'

const Logo = () => {
    return (
        <div className = {classes.Logo}>
            <img src={burgerLogo} alt="My Burger"/>
        </div>
    )
}

export default Logo
