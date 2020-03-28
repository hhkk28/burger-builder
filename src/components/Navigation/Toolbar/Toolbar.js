import React from 'react'

import classes from './Toolbar.module.css'
import Logo from '../../ui/Logo/Logo'
import NavigationMenu from '../NavigationMenu/NavigationMenu'

const Toolbar = () => (
    <header className = {classes.Toolbar}>
        <div>Menu</div>
        <Logo/>
        <nav>
            <NavigationMenu/>
        </nav>
    </header>
)

export default Toolbar
