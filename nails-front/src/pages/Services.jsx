import React, {useEffect} from 'react';
import Naslov from "../components/Naslov";
import server from "../server";
import {Col, Form, Row, Table} from "react-bootstrap";

const Services = () => {
    const [services, setServices] = React.useState([]);
    const [filteredServices, setFilteredServices] = React.useState([]);
    useEffect(() => {

        server.get("/services")
            .then((response) => {
                console.log(response.data);
                setServices(response.data.data);
                setFilteredServices(response.data.data);
            }).catch((error) => {
                console.error(error);
            }
        );

    }, []);


    return (
        <>
            <Naslov title="Usluge" subtitle=""/>
            <Row>
                <Col>
                    <Form.Group controlId="formSearch">
                        <Form.Control type="text" className="mb-3" placeholder="Pretrazi usluge po nazivu" onChange={(e) => {
                            let search = e.target.value;

                            if (search === ""){
                                setFilteredServices(services);
                                return;
                            }

                            if (search.length < 3){
                                return;
                            }

                            let filtered = services.filter((service) => {
                                return service.service_name.toLowerCase().includes(search.toLowerCase());
                            });
                            setFilteredServices(filtered);
                        }}/>
                    </Form.Group>
                    <Table title={"Usluge"} striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Naziv</th>
                            <th>Tip usluge</th>
                            <th>Opis</th>
                            <th>Cena</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredServices.map((service, index) => {
                            return (
                                <tr key={service.id}>
                                    <td>{index + 1}</td>
                                    <td>{service.service_name}</td>
                                    <td>{service.service_type.type_name}</td>
                                    <td>{service.service_description}</td>
                                    <td>{service.service_price} rsd</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
};

export default Services;