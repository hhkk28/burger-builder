import React from 'react'

import Logo from '../../ui/Logo/Logo'
import NavigationMenu from '../NavigationMenu/NavigationMenu'
import classes from './SideDrawer.module.css'

const SideDrawer = () => {
    return (
        <div className = {classes.SideDrawer}>
            <Logo height = "11%"/>
            <nav className={classes.Navbar}>
                <NavigationMenu />
            </nav>
        </div>
    )
}

export default SideDrawer
