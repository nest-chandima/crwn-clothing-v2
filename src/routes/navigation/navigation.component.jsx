import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import './navigation.style.scss';
import { SignOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";


const Navigation  = () =>{

  const {curruntUser} = useContext(UserContext);

  return (
  <Fragment>
    <div className="navigation">
      <Link className="logo-container" to='/'>
        <div>{<CrwnLogo className="logo"/>}</div>
      </Link>
      <div className="nav-links-container">
        <Link className="nav-link" to='/shop'>
            SHOP
        </Link>
        {
          curruntUser ? (
          <span className="nav-link" onClick={ SignOutUser }>Sign Out</span>
          ):

        (<Link className="nav-link" to='/auth'>
            SIGN-IN
        </Link>)
        }
      </div>
    </div>
    <Outlet />
  </Fragment>)
}

export default Navigation;