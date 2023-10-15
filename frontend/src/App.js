import "./App.css";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes ,Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./component/Home/Home";


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
 </Routes>
 <Footer />
</Router>
 ) ;
}

export default App;
