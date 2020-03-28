import React, { Component } from 'react';

import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad : 0.2,
    cheese : 0.5, 
    meat : 1.2,
    bacon : 0.8
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        } , 
        totalPrice : 4,
        purchasable : false,
        purchaseModalDisplay : false
    }

    addIngredientHandler = (type) => {
        this.setState ((prevState , nextState) => {
            const newIngredients = {...prevState.ingredients}
            newIngredients[type] = newIngredients[type] + 1
            const newTotalPrice = prevState.totalPrice + INGREDIENT_PRICES[type]
            const newPurchasable = this.updatePurchasableState(newIngredients)
            nextState = {
                ingredients : {...newIngredients},
                totalPrice : newTotalPrice,
                purchasable : newPurchasable
            }
            return nextState
        })
    }
    removeIngredientHandler = (type) => {
        this.setState ((prevState , nextState) => {
            const newIngredients = {...prevState.ingredients}
            newIngredients[type] = newIngredients[type] - 1
            const newTotalPrice = prevState.totalPrice - INGREDIENT_PRICES[type]
            const newPurchasable = this.updatePurchasableState(newIngredients)
            nextState = {
                ingredients : {...newIngredients},
                totalPrice : newTotalPrice,
                purchasable : newPurchasable
            }
            return nextState
        })
    }

    updatePurchasableState = (ingredient) => {
        const totalIngredientCount = Object.keys(ingredient)
            .map(igKey => ingredient[igKey])
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return totalIngredientCount > 0;
    }

    showOrderSummaryModal = () => {
        this.setState({purchaseModalDisplay : true})
    }

    purchaseCancelHandler = () => {
        this.setState ({purchaseModalDisplay : false})
    }

    purchaseContinueHandler = () => {
        alert('You may continue!')
    }

    render () {
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal 
                    show = {this.state.purchaseModalDisplay} 
                    closeModal = {this.purchaseCancelHandler}>
                    <OrderSummary 
                        price = {this.state.totalPrice}
                        purchaseCanceled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                        ingredients = {this.state.ingredients}
                        />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    price = {this.state.totalPrice}
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved = {this.removeIngredientHandler}
                    purchaseModalShow = {this.showOrderSummaryModal}
                    disabledButtons = {disabledInfo}
                    purchasable = {!this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;