import { CART_ACTION_TYPES } from "./cart.type";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {

    const existItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1 } :
            cartItem
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1 }];
}

const removeFromCart = (cartItems, productToRemove) => {
    
    const existItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if(existItem.quantity === 1){
        
           return  cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
        
    }

    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? {...cartItem, quantity: productToRemove.quantity - 1 } :
            cartItem
        );


        
    }
    
    
    const clearCartItem = (cartItems, itemToClear) =>{
        return  cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);
    }

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems,productsToAdd) => {
    const newCartItems = addCartItem(cartItems, productsToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);

}
export const removeItemsFromCart = (cartItems,productToRemove) => {
    const newCartItems = removeFromCart(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}
export const clearItemFromCart = (cartItems,itemToClear) =>{
    const newCartItems =  clearCartItem(cartItems,itemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}
