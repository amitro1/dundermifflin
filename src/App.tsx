import { BrowserRouter as Router, Route, Routes, } from "react-router-dom"
import './App.css';
import Login from './components/Login';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Registeration from "./components/Registeration";
import MyFavCard from "./components/MyFavCard";
import { ToastContainer } from "react-toastify";
import CardDetails from "./components/CardDetails";
import { useState } from "react";
import MyCard from "./components/MyCard";
import UpdateProduct from "./components/UpdateProducts";
import AddProduct from "./components/AddProduct";
import About from "./components/About";
import { DarkModeProvider } from "./services/DarkModeContextServies";



function App() {
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false, userType: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );

  return (
    <div className="App">
      <DarkModeProvider>
        <ToastContainer theme='dark' />
        <Router>
          <Navbar userInfo={userInfo} setUserInfo={setUserInfo} />
          <Routes>
            <Route path="/" element={<Home userInfo={userInfo} />} />
            <Route path="/login" element={<Login setUserInfo={setUserInfo} />} />
            <Route path="/myFavCard" element={<MyFavCard userInfo={userInfo} />} />
            <Route path="/registeration" element={<Registeration setUserInfo={setUserInfo} />} />
            <Route path="/card-details/:id" element={<CardDetails />} />
            <Route path="/products/update/:id" element={<UpdateProduct />} />
            <Route path="about" element={<About />} />
            <Route path="/mycard" element={<MyCard userinfo={userInfo} />} />
            <Route path="/addProduct" element={<AddProduct userinfo={userInfo} />} />
          </Routes>
          <Footer />
        </Router>
      </DarkModeProvider>
    </div>
  );
}


export default App;
