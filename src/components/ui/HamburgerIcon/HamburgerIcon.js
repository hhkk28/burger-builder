import React from 'react'
import classes from './HamburgerIcon.module.css'

const HamburgerIcon = (props) => {
    return (
        <div 
            className = {classes.HamburgerIcon}
            onClick = {props.clicked}>
           <div></div>
           <div></div>
           <div></div>
        </div>
    )
}

export default HamburgerIcon
