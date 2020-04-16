import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../ui/Button/Button'
import classes from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Have a great meal!</h1>
            <div>
                <Burger ingredients = {props.ingredients} />
            </div>
            <Button buttonType = "Success" clicked = {props.continueCheckout}>CONTINUE</Button>
            <Button buttonType = "Danger" clicked ={props.cancelCheckout}>CANCEL</Button>   
        </div>
    )
}

export default CheckoutSummary
