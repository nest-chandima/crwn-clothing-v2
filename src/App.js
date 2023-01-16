import { Routes,Route, Outlet } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";  
import Athentication from "./routes/authentication/authentication.component";

const Shop = () =>{
  return(
    <div>
      <h1>This is My Shop Componennt</h1>
    </div>
  )
}
const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route  index element={ <Home />} />
        <Route  path="Shop" element={ <Shop />} />
        <Route path="auth" element={<Athentication/>}/>
      </Route>
    </Routes>
    
  );
}

export default App;
