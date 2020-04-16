import React from 'react'

import classes from './NavigationMenu.module.css'
import NavigationItem from './NavigationItem/NavigationItem'


const NavigationItems = () => {
    return (
        <ul className = {classes.NavigationMenu}>
            <NavigationItem link = "/" exact>Burger Builder</NavigationItem>
            <NavigationItem link ="/my-orders">My Orders</NavigationItem>
        </ul>
    )
}

export default NavigationItems
