import React, { Component } from 'react';

import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import LoaderAnimation from '../../components/ui/LoaderAnimation/LoaderAnimation'
import withErrorHandler from '../../hoc/withErrorHandler'
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
    salad : 0.2,
    cheese : 0.5, 
    meat : 1.2,
    bacon : 0.8
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice : 4,
        purchasable : false,
        purchaseModalDisplay : false,
        loading: false,
        error : false
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
        // this.setState({loading : true})
        // const postOrder = {
        //     ingredients : this.state.ingredients,
        //     totalPrice : this.state.totalPrice,
        //     customerInformation : {
        //         name: 'Harish Karthik',
        //         contact: '9876543210'
        //     }
        // }
        // axios.post('/orders.json',postOrder)
        //     .then(response => {
        //         setTimeout(() => this.setState({loading : false , purchaseModalDisplay : false}) , 1000)
        //     })
        //     .catch(error => {
        //         setTimeout(() => this.setState({loading : false , purchaseModalDisplay : false}) , 1000)
        //     })
        this.props.history.push({
            pathname: '/checkout',
            data : {
                ingredients : this.state.ingredients,
                totalPrice : this.state.totalPrice
            }})
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
    }

    componentDidMount () {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients : response.data})
            })
            .catch(error => setTimeout(() => this.setState({error: true}) , 1250))
    }

    render () {
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummaryContent = null
        if(this.state.ingredients) {
            orderSummaryContent = <OrderSummary 
                                        price = {this.state.totalPrice}
                                        purchaseCanceled = {this.purchaseCancelHandler}
                                        purchaseContinued = {this.purchaseContinueHandler}
                                        ingredients = {this.state.ingredients}/>
        }
        if(this.state.loading) {
            orderSummaryContent = <LoaderAnimation/>
        }
        let burgerContent = this.state.error 
            ? <p style = {{textAlign : 'center'}}>Unable to fetch the burger. Please check your network connection</p> 
            :<LoaderAnimation/>
        if(this.state.ingredients) {
            burgerContent = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        price = {this.state.totalPrice}
                        ingredientAdded = {this.addIngredientHandler} 
                        ingredientRemoved = {this.removeIngredientHandler}
                        purchaseModalShow = {this.showOrderSummaryModal}
                        disabledButtons = {disabledInfo}
                        purchasable = {!this.state.purchasable}/>
                </Aux>)
        }
        return (
            <Aux>
                <Modal 
                    show = {this.state.purchaseModalDisplay} 
                    closeModal = {this.purchaseCancelHandler}>
                    {orderSummaryContent}
                </Modal>
                {burgerContent}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);