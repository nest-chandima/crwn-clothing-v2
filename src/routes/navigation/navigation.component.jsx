import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.style";
import { SelectCurruntUser } from "../../store/user/user.selector";

// import { CartContext } from "../../contexts/cart.context";
import { selectIsCartOpen } from "../../store/cart/cart.select";
import { signOutStart } from "../../store/user/user.action";



const Navigation  = () =>{

  const dispatch = useDispatch();
  const curruntUser = useSelector(SelectCurruntUser);
  // const {isCartOpen} = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);

  const SignOutUser = () => dispatch(signOutStart());
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