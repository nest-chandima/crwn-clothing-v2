import { Routes,Route, Outlet } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";  
import Athentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserSession } from "./store/user/user.action";

const App = () => {

  const dispatch  = useDispatch();
  useEffect(()=>{
        dispatch(checkUserSession());
    },[]);
    
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route  index element={ <Home />} />
        <Route  path="Shop/*" element={ <Shop />} />
        <Route path="auth" element={<Athentication/>}/>
        <Route path="checkout" element={<Checkout/>}/>
      </Route>
    </Routes>
    
  );
}

export default App;
