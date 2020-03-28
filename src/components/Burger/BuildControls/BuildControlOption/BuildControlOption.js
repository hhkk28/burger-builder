import React from 'react'
import classes from './BuildControlOption.module.css'

const BuildControlOption = (props) => {
    return (
        <div className = {classes.BuildControl}>
            <div className = {classes.Label}>{props.label}</div>
            <button 
                className = {classes.More}
                onClick = {props.ingredientAdded}>More</button>
            <button 
                className = {classes.Less}
                onClick = {props.ingredientRemoved}
                disabled = {props.disabledButton}>Less</button>
        </div>
    )
}

export default BuildControlOption
