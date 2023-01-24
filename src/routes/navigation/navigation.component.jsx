import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
// import './navigation.style.scss';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.style";


import { SignOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";



const Navigation  = () =>{

  const {curruntUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  return (
  <Fragment>
    <NavigationContainer>
      <LogoContainer to='/'>
        <div>{<CrwnLogo className="logo"/>}</div>
      </LogoContainer>
      <NavLinks>
        <NavLink to='/shop'>
            SHOP
        </NavLink>
        {
          curruntUser ? (
          <NavLink as='span' onClick={ SignOutUser }>Sign Out</NavLink>
          ):

        (<NavLink to='/auth'>
            SIGN-IN
        </NavLink>)
        }
        <CartIcon/>
      </NavLinks>
      {isCartOpen && <CartDropdown/>}
      
    </NavigationContainer>
    <Outlet />
  </Fragment>)
}

export default Navigation;