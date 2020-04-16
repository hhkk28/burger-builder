import React from 'react'
import classes from './SingleOrder.module.css'

const SingleOrder = (props) => {
    const ingredientOutput = []
    for (let ingredientName in props.ingredients){
        ingredientOutput.push(
            <span 
                className = {[classes.Ingredient , classes[ingredientName]].join(' ')}
                key = {ingredientName}> 
                {ingredientName} : {props.ingredients[ingredientName]}
            </span>
        )
    }
    return (
        <div className = {classes.SingleOrder}>
            <h4>Ingredients</h4> 
            {ingredientOutput}
            <p>Total Price : <b>$ {props.totalPrice.toFixed(2)}</b></p>
        </div>
    )
}

export default SingleOrder
