import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PonudaServisi from "./components/PonudaServisi";
import {Container} from "react-bootstrap";
import Naslov from "./components/Naslov";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Reservations from "./pages/Reservations";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Slider from "./components/Slider";
import Products from "./pages/Products";

function App() {
  return (
    <>
        <Navigation />
        <Slider />
        <Container>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/products" element={<Products/>} />
                    <Route path="/services" element={<Services/>} />
                    <Route path="/reservations" element={<Reservations/>} />
                    <Route path="/admin" element={<Admin/>} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
            </BrowserRouter>

        </Container>
        <Footer />
    </>
  );
}

export default App;
