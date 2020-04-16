import React, { Component } from 'react'

import SingleOrder from '../../components/Orders/SingleOrder/SingleOrder'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'

class MyOrders extends Component {
    state = {
        orders : [],
        loading : true
    }

    componentDidMount () {
        const fetchedData = [];
        axios.get('/orders.json')
            .then(res => {
                for(let key in res.data) {
                    fetchedData.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState ({
                    loading: false,
                    orders : fetchedData
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        console.log(this.state.orders)
        return (
            <div>
                {this.state.orders.map(order => (
                    <SingleOrder 
                        key ={order.id}
                        ingredients = {order.ingredients}
                        totalPrice = {+order.totalPrice}/>
                ))}
            </div>
        )
    }
}

export default withErrorHandler(MyOrders,axios)
