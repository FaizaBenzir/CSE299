import "./App.css";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes ,Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./component/Home/Home";
import Loader from "./component/Loader/loader";
import ProductDetails from "./component/Product/ProductDetails.js"


function App() {

  React.useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  
    
  }, []);
  return (
  <Router>
 <Header />
 <Routes>
< Route extact path="/" Component={Home} />
< Route extact path="/sad" Component={Loader} />
< Route extact path="/product/:id" Component={ProductDetails} />
 </Routes>
 <Footer />
</Router>
 ) ;
}

export default App;
