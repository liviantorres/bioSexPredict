import {BrowserRouter, Routes, Route  } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register";

const Paths = () => {
    return ( 
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Login/> }/>
            <Route path="/register" element={ <Register/> }/>
        </Routes>
        </BrowserRouter>
        
        </>
     );
}
 
export default Paths;