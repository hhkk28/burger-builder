import React from 'react'
import classes from './FormInput.module.css'

const FormInput = (props) => {
    let inputElement
    switch (props.elementType) {
        case 'input':
            inputElement = <input 
                className= {classes.Input} 
                {...props.elementConfig}
                onChange = {props.changed}
                value = {props.value}/>
            break;

        case 'select': 
            inputElement = (
                <select
                    className ={classes.Input}
                    value = {props.value}
                    onChange = {props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option
                            key = {option.value}
                            value = {option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className= {classes.Input} 
                {...props.elementConfig}
                value = {props.value}
                onChange = {props.changed}/>
            break;
    }
    return (
        <div className = {classes.InputContainer}>
            <label htmlFor=""></label>
            {inputElement}
        </div>
    )
}

export default FormInput
