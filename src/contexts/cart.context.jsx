import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    cartCount: 0,
    addItemToCart: () => {},
    clearItemFromCart : () => {},
    removeItemsFromCart: () => {},
    cartTotal : 0,

});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);

    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0)
        setCartTotal(newCartTotal);

    }, [cartItems]);

    const addItemToCart = (productsToAdd) => {
        setCartItem(addCartItem(cartItems, productsToAdd));

    }
    const removeItemsFromCart = (productToRemove) => {
        setCartItem(removeFromCart(cartItems, productToRemove))
    }
    const clearItemFromCart = (itemToClear) =>{
        setCartItem(clearCartItem(cartItems,itemToClear));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemsFromCart, clearItemFromCart, cartTotal };

    return <CartContext.Provider value={ value }> { children } </CartContext.Provider>

}