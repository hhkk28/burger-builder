import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import LoaderAnimation from '../../components/ui/LoaderAnimation/LoaderAnimation'
import withErrorHandler from '../../hoc/withErrorHandler'
import axios from '../../axios-orders'
import * as actionTypes from '../../stores/actions'

class BurgerBuilder extends Component {
    state = {
        purchaseModalDisplay : false,
        loading: false,
        error : false
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
        this.props.history.push('/checkout')
    }

    // componentDidMount () {
    //     axios.get('/ingredients.json')
    //         .then(response => {
    //             this.setState({ingredients : response.data})
    //         })
    //         .catch(error => setTimeout(() => this.setState({error: true}) , 1250))
    // }

    render () {
        const disabledInfo = {...this.props.ingredients}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummaryContent = null
        if(this.props.ingredients) {
            orderSummaryContent = <OrderSummary 
                                        price = {this.props.totalPrice}
                                        purchaseCanceled = {this.purchaseCancelHandler}
                                        purchaseContinued = {this.purchaseContinueHandler}
                                        ingredients = {this.props.ingredients}/>
        }
        if(this.state.loading) {
            orderSummaryContent = <LoaderAnimation/>
        }
        let burgerContent = this.state.error 
            ? <p style = {{textAlign : 'center'}}>Unable to fetch the burger. Please check your network connection</p> 
            :<LoaderAnimation/>
        if(this.props.ingredients) {
            burgerContent = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        price = {this.props.totalPrice}
                        ingredientAdded = {this.props.addIngredient} 
                        ingredientRemoved = {this.props.removeIngredient}
                        purchaseModalShow = {this.showOrderSummaryModal}
                        disabledButtons = {disabledInfo}
                        purchasable = {this.updatePurchasableState(this.props.ingredients)}/>
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

const mapStatetoProps = state => {
    return {
        ingredients : state.ingredients,
        totalPrice : state.totalPrice
    }
}

const mapDispatchtoProsp = dispatch => {
    return {
        addIngredient : (ingredientName) => dispatch({type : actionTypes.ADD_INGREDIENT , ingredientName : ingredientName}),
        removeIngredient : (ingredientName) => dispatch({type : actionTypes.REMOVE_INGREDIENT , ingredientName : ingredientName})
    }
}

export default connect(mapStatetoProps,mapDispatchtoProsp)(withErrorHandler(BurgerBuilder, axios));