import React from 'react';
import Naslov from "../components/Naslov";
import {Col, Form, Row} from "react-bootstrap";
import useForm from "../useForm";
import server from "../server";

const Login = () => {

    const [showRegistration, setShowRegistration] = React.useState(false);
    const title = !showRegistration ? "Login" : "Registracija";
    const [poruka, setPoruka] = React.useState("");

    const { formData, handleChange } = useForm({email: "", password: "", name: ""});

    const login = () => {
        server.post("/login", formData)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success"){
                    sessionStorage.setItem("token", response.data.data.token);
                    sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
                    window.location.href = "/";
                }else{
                    setPoruka("Pogresni podaci");
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    const registracija = () => {
        console.log(formData);
        server.post("/register", formData)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success"){
                    setPoruka("Uspesna registracija");
                    setShowRegistration(false);
                }else{
                    setPoruka("Greska prilikom registracije");
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <Naslov title={title} subtitle={poruka}/>

            <Row>
                <Col>
                    {
                        !showRegistration && (
                            <>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email adresa</Form.Label>
                                    <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Unesite email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Lozinka</Form.Label>
                                    <Form.Control type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Unesite lozinku" />
                                </Form.Group>
                                <hr/>
                                <p><a href="#" onClick={() => setShowRegistration(true)}>Nemate nalog, registrujte se</a></p>
                                <button onClick={login} className="btn yellow-button">Login</button>
                            </>
                        )
                    }

                    {
                        showRegistration && (
                            <>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Ime</Form.Label>
                                    <Form.Control type="text" name="name" onChange={handleChange} value={formData.name}
                                                  placeholder="Unesite ime"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email adresa</Form.Label>
                                    <Form.Control type="email" name="email" onChange={handleChange} value={formData.email}
                                                  placeholder="Unesite email"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Lozinka</Form.Label>
                                    <Form.Control type="password" name="password" onChange={handleChange}
                                                  value={formData.password} placeholder="Unesite lozinku"/>
                                </Form.Group>
                                <hr/>
                                <p><a href="#" onClick={() => setShowRegistration(false)}>Imate nalog, ulogujte se</a></p>
                                <button onClick={registracija} className="btn yellow-button">Registracija</button>
                            </>
                        )
                    }
                </Col>
            </Row>

        </>
    );
};

export default Login;