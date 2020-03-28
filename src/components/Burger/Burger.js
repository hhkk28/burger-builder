import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    function deriveBurgerIngredients() {
        const transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce ((arr,el) => {
            return arr.concat(el)
        },[])

        if(transformedIngredients.length !== 0) {
            return transformedIngredients;
        } else {
            return <p>Please Select the ingredients</p>
        }
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {deriveBurgerIngredients()}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;