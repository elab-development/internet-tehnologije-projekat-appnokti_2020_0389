import React, {useEffect} from 'react';
import {Carousel, Col, Row} from "react-bootstrap";
import nailsbg from "../images/nailsbg.jpg";
import server from "../server";

const Slider = () => {

    const [data, setData] = React.useState([]);
    const izjave = [
        "Ovo je najbolji salon u gradu, i svaka pohvala. Sve preporuke!!! :)",
        "Sve preporuke za ovaj salon. Usluga je na najvisem nivou. Izuzetno osoblje i velike pohvale za Anu.",
        "Savrseno uradjeni nokti, i to po najpovoljnijim cenama. Ana je neverovatna, i svaka preporuka za njen salon."
    ];

    useEffect(() => {
        server.get("https://randomuser.me/api/?results=3")
            .then((response) => {
                console.log(response.data);
                let podaci = response.data.results;
                let noviNiz = [];

                for (let i = 0; i < podaci.length; i++){
                    let obj = {
                        id: i + 1,
                        name: podaci[i].name.first,
                        email: podaci[i].email,
                        picture: podaci[i].picture.large,
                        slider_image: nailsbg,
                        izjava: izjave[i]
                    }
                    noviNiz.push(obj);
                }

                setData(noviNiz);

            }).catch((error) => {
                console.error(error);
            });
    }, []);

    const navigate = window.location.pathname;

    if (navigate !== '/' && navigate !== '/about') {
        return null;
    }

    return (
        <>
            <Carousel>
                {
                    data.map((item) => {
                        return (
                            <Carousel.Item key={item.id}>
                                <img
                                    className="d-block w-100"
                                    src={item.slider_image}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <Row>
                                        <Col md={6}>
                                            <h1>{item.name} ({item.email})</h1>
                                            <p>{item.izjava}</p>
                                        </Col>

                                    </Row>

                                </Carousel.Caption>
                            </Carousel.Item>
                        );
                    })
                }
            </Carousel>
        </>
    );
};

export default Slider;