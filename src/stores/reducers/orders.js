import * as actionTypes from '../actions/actionTypes'

const initialState = {
    order : [],
    loading: false
}

const orderReducer = (state = initialState , action) => {
    switch (action.type ){
        case actionTypes.PURCHASE_BURGER_START : 
            console.log('action reducer')
            return{
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS :
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                order: state.order.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_FAILED : 
            return{
                ...state,
                loading: false
            }
        default :
            return state
    }
}

export default orderReducer