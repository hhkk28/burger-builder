import React, { Component } from 'react'
import classes from './ContactData.module.css'
import Button from '../../../components/ui/Button/Button'
import LoaderAnimation from '../../../components/ui/LoaderAnimation/LoaderAnimation'
import axios from '../../../axios-orders'
import FormInput from '../../../components/ui/FormInput/FormInput'

class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Your Name',
                    required : true
                },
                value:'',
                valid: false
            },
            email: {
                elementType : 'input',
                elementConfig : {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                    required: true
                },
                value:'',
                valid: false
            },
            street:  {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Street Name',
                    required: true
                },
                value:'',
                valid: false
            },
            postalCode :  {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'ZIP Code',
                    required: true
                },
                value:'',
                valid: false
            },
            deliveryMethod: {
                elementType : 'select',
                elementConfig : {
                    options : [
                        {value : 'fastest' , displayValue : 'Fastest'},
                        {value : 'normal' , displayValue : 'Normal'}
                    ]
                },
                value : 'fastest',
                valid: true
            }
        },
        orderFormValid : false,
        loading: false
    }

    inputChangeHandler = (event , inputIdentifier) => {
        const newOrderForm = {
            ...this.state.orderForm
        }
        const newFormElement = {
            ...newOrderForm[inputIdentifier]
        }
        newFormElement.value = event.target.value
        newFormElement.valid = event.target.validity.valid
        newOrderForm[inputIdentifier] = newFormElement
        let formIsValid = true
        for(let inputIdentifier in newOrderForm) {
            formIsValid = newOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm : newOrderForm ,orderFormValid : formIsValid })
    }
    outofFocusHandler = (event) =>{
        console.log(this.state.orderForm)
    }
    placeOrderHandler = (e) => {
        e.preventDefault();
        this.setState({loading : true})
        const derivedCustomerData = {}
        for (let formInputName in this.state.orderForm) {
            derivedCustomerData[formInputName] = this.state.orderForm[formInputName].value
        }
        console.log(derivedCustomerData);
        const postOrder = {
            ingredients : this.props.ingredients,
            totalPrice : this.props.totalPrice,
            customerInformation : {
                ...derivedCustomerData
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
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config : this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit = {this.placeOrderHandler}>
                {
                    formElementsArray.map(formElement => 
                        <FormInput
                            key={formElement.id} 
                            elementType = {formElement.config.elementType} 
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            changed = {(event) => this.inputChangeHandler(event , formElement.id)}
                            focusOut = {this.outofFocusHandler}/>    
                    )
                }
                <Button 
                    buttonType ="Success"
                    disabled = {!this.state.orderFormValid}>Order</Button>
            </form>
        )
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
