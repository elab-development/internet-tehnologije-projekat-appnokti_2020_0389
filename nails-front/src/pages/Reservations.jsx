import React, {useEffect} from 'react';
import Naslov from "../components/Naslov";
import {Col, Form, Row, Table} from "react-bootstrap";
import server from "../server";
import useForm from "../useForm";
import { CSVLink } from "react-csv";

const Reservations = () => {

    const { formData, handleChange } = useForm({
        slot_id: "",
        service_id: "",
    });
    const [reservation_date, setReservationDate] = React.useState( new Date().toISOString().split('T')[0]);

    const [poruka, setPoruka] = React.useState("");

    const [services, setServices] = React.useState([]);
    const [slots, setSlots] = React.useState([]);
    const [osvezi, setOsvezi] = React.useState(false);
    const [reservations, setReservations] = React.useState([]);

    const [csvData, setCsvData] = React.useState([]);

    useEffect(() => {

            server.get("/services")
                .then((response) => {
                    console.log(response.data);
                    setServices(response.data.data);
                }).catch((error) => {
                    console.error(error);
                }
            );
    }, []);

    useEffect(() => {
        server.get("/free-slots?reservation_date=" + reservation_date)
            .then((response) => {
                console.log(response.data);
                setSlots(response.data.data);
            }).catch((error) => {
                console.error(error);
            }
        );
    }, [reservation_date]);

    const user = JSON.parse(sessionStorage.getItem('user'));

    const rezervisi = () => {
        server.post("/reservations", {
            service_id: formData.service_id,
            slot_id: formData.slot_id,
            reservation_date: reservation_date,
            user_id: user.id
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success"){
                    setPoruka("Uspesna rezervacija");
                    setOsvezi(!osvezi);
                }else{
                    setPoruka("Greska prilikom rezervacije");
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        server.get("/reservations-by-user/" + user.id)
            .then((response) => {
                console.log(response.data);
                setReservations(response.data.data);

                //setCsvData(response.data.data);

                let podaci = response.data.data;
                let noviNiz = [];

                for (let i = 0; i < podaci.length; i++){
                    let obj = {
                        id: i + 1,
                        name: podaci[i].user.name,
                        service: podaci[i].service.service_name,
                        slot: podaci[i].slot.time_slot,
                        date: podaci[i].reservation_date
                    }
                    noviNiz.push(obj);
                }

                setCsvData(noviNiz);

            }).catch((error) => {
                console.error(error);
            }
        );
    }, [osvezi]);

    return (
        <>
            <Naslov title="Rezervacije" subtitle={poruka}/>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicService">
                        <Form.Label>Usluga</Form.Label>
                        <Form.Select name="service_id" onChange={handleChange}>
                            {services && services.map((service) => {
                                return (
                                    <option key={service.id} value={service.id}>{service.service_name}</option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicSlot">
                        <Form.Label>Termin</Form.Label>
                        <Form.Select name="slot_id" onChange={handleChange}>
                            {slots && slots.map((slot) => {
                                return (
                                    <option key={slot.id} value={slot.id}>{slot.time_slot}</option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDate">
                        <Form.Label>Datum</Form.Label>
                        <Form.Control type="date" name="reservation_date" onChange={
                            (e) => {
                                //handleChange(e);
                                setReservationDate(e.target.value);
                            }
                        } value={reservation_date}/>
                    </Form.Group>
                    <hr/>
                    <button className="btn yellow-button" onClick={rezervisi}>Rezervisi</button>
                </Col>

                <Col md={6}>
                    <h3 className="text-center m-3">Moje rezervacije</h3>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>Usluga</th>
                            <th>Termin</th>
                            <th>Datum</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            reservations && reservations.map((reservation) => {
                                const today = new Date();
                                const reservationDate = new Date(reservation.reservation_date);
                                const red = reservationDate < today ? 'table-danger' : 'table-success';
                                return (
                                    <tr key={reservation.id} className={red}>
                                        <td>{reservation.service.service_name}</td>
                                        <td>{reservation.slot.time_slot}</td>
                                        <td>{reservation.reservation_date}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </Table>
                    <hr />
                    <CSVLink
                        data={csvData}
                        filename={"moje_rezervacije.csv"}
                        className="btn yellow-button"
                        target="_blank"
                        >
                        Preuzmite vase podatke
                     </CSVLink>
                </Col>
            </Row>
        </>
    );
};

export default Reservations;