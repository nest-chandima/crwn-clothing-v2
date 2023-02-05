// import { type } from "@testing-library/user-event/dist/type";
import { createContext,useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal : 0,
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS : 'SET_CART_ITEMS',
    SET_IS_CART_OPEN : 'SET_IS_CART_OPEN'
}

const cartReducer = (state,action) =>{
    const {type,payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            };

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`unhandled type ${type} in CartReducer`)
    }

}

export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItem] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    //     setCartCount(newCartCount);

    // }, [cartItems]);

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0)
    //     setCartTotal(newCartTotal);
        
    // }, [cartItems]);

    const[{cartItems,cartCount,cartTotal,isCartOpen}, dispatch] = useReducer(cartReducer,INITIAL_STATE);

    const updateCartItemReducer = (newCartItems) =>{
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0)

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartCount :newCartCount,
            cartTotal : newCartTotal
        }));
    }

    const addItemToCart = (productsToAdd) => {
        const newCartItems = addCartItem(cartItems, productsToAdd);
        updateCartItemReducer(newCartItems);

    }
    const removeItemsFromCart = (productToRemove) => {
        const newCartItems = removeFromCart(cartItems, productToRemove);
        updateCartItemReducer(newCartItems);
    }
    const clearItemFromCart = (itemToClear) =>{
        const newCartItems =  clearCartItem(cartItems,itemToClear);
        updateCartItemReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemsFromCart, clearItemFromCart, cartTotal };

    return <CartContext.Provider value={ value }> { children } </CartContext.Provider>

}