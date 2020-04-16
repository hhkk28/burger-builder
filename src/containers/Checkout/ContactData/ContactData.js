import React, { Component } from 'react'
import classes from './ContactData.module.css'
import Button from '../../../components/ui/Button/Button'
import LoaderAnimation from '../../../components/ui/LoaderAnimation/LoaderAnimation'
import axios from '../../../axios-orders'

// Add custom input element from the youtube video

class ContactData extends Component {
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        },
        loading: false
    }

    placeOrderHandler = (e) => {
        e.preventDefault();
        this.setState({loading : true})
        const postOrder = {
            ingredients : this.props.ingredients,
            totalPrice : this.props.totalPrice,
            customerInformation : {
                name: 'Harish Karthik',
                email: 'abc@xyz.com',
                address : {
                    street : 'efg',
                    postalCode : '12345'
                }
            }
        }
        axios.post('/orders.json',postOrder)
            .then(response => {
                setTimeout(() => {
                    this.setState({loading : false })
                    this.props.history.push('/')
                } , 1000)
            })
            .catch(error => {
                setTimeout(() => this.setState({loading : false}) , 1000)
            })
    }
    render() {
        console.log(this.props)
        let form = (<form>
            <input className = {classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className = {classes.Input} type="email" name="email" placeholder = "Your Mail"/>
            <input className = {classes.Input} type="text" name="street" placeholder ="Your Street"/>
            <input className = {classes.Input} type="text" name="postalCode" placeholder="Your Postal Code"/>
            <Button 
                buttonType ="Success"
                clicked = {this.placeOrderHandler}>Order</Button>
        </form>)
        if(this.state.loading){
            form = <LoaderAnimation/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact detail for deliver</h4>
                {form}
            </div>
        )
    }
}

export default ContactData
