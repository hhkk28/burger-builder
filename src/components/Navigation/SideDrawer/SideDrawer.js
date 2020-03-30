import React from 'react'

import Logo from '../../ui/Logo/Logo'
import NavigationMenu from '../NavigationMenu/NavigationMenu'
import classes from './SideDrawer.module.css'
import Aux from '../../../hoc/_Aux'
import Backdrop from '../../ui/Backdrop/Backdrop'

const SideDrawer = (props) => {

    const SideDrawerClasses = props.open ? [classes.SideDrawer,classes.Open] :
    [classes.SideDrawer , classes.Close]

    return (
        <Aux>
            <Backdrop 
                show = {props.open}
                clicked = {props.hideSideDrawer}/>
            <div 
                className = {SideDrawerClasses.join(' ')}>
                <Logo height = "11%"/>
                <nav className={classes.Navbar}>
                    <NavigationMenu />
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer
