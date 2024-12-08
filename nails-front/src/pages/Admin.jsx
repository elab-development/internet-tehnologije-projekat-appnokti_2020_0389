import React, {useEffect} from 'react';
import Naslov from "../components/Naslov";
import {Col, Row, Table} from "react-bootstrap";
import {Chart} from "react-google-charts";
import server from "../server";
import {GiNextButton, GiPreviousButton} from "react-icons/gi";
import {FaTrash} from "react-icons/fa";

const Admin = () => {

    const [poruka, setPoruka] = React.useState("");
    const [url, setUrl] = React.useState("/paginate-reservations");
    const [rezervacije, setRezervacije] = React.useState([]);
    const [links, setLinks] = React.useState([]);
    const [osvezi, setOsvezi] = React.useState(false);

    const [chartData, setChartData] = React.useState([
        ['Termin', 'Broj rezervacija'],
    ]);

    useEffect(() => {
        server.get("/chart-data")
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success"){
                    setChartData([
                        ['Termin', 'Broj rezervacija'],
                        ...response.data.data.map((item) => [item.time_slot, parseInt(item.total_reservations)])
                    ]);
                }else{
                    setPoruka("Greska prilikom ucitavanja podataka");
                }

                console.log(chartData);
            }).catch((error) => {
                console.error(error);
            });

    }, [osvezi]);

    const deleteReservation = (id) => {
        server.delete("/reservations/" + id)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success"){
                    setPoruka("Uspesno obrisana rezervacija");
                    setOsvezi(!osvezi);
                }else{
                    setPoruka("Greska prilikom brisanja rezervacije");
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        server.get(url)
            .then((response) => {
                console.log(response.data);
                setRezervacije(response.data.data.data);
                setLinks(response.data.data.links);
            }).catch((error) => {
                console.error(error);
            });
    }, [url, osvezi]);

    return (
        <>
            <Naslov title="Admin" subtitle={poruka}/>

            <Row>
                <Col>
                    <Chart
                        chartType="PieChart"
                        data={chartData}
                        options={{
                            title: "Podaci o rezervacijama po terminima",
                            legend: { position: "right" },
                            is3D: true,
                        }}
                        width={"100%"}
                        height={"400px"}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Korisnik</th>
                                <th>Termin</th>
                                <th>Usluga</th>
                                <th>Datum</th>
                                <th>Akcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rezervacije.map((rezervacija) => {
                                    return (
                                        <tr key={rezervacija.id}>
                                            <td>{rezervacija.id}</td>
                                            <td>{rezervacija.name}</td>
                                            <td>{rezervacija.time_slot}</td>
                                            <td>{rezervacija.service_name}</td>
                                            <td>{rezervacija.reservation_date}</td>
                                            <td>
                                                <button onClick={() => deleteReservation(rezervacija.id)} className="btn yellow-button"><FaTrash/></button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        links && links.map((link, index) => {

                            let label = link.label;

                            if (label.includes("Previous")) {
                                label = "Prethodna";
                            }

                            if (label.includes("Next")) {
                                label =  "Sledeca";
                            }

                            return (
                                <button key={index} onClick={() => setUrl(link.url)} disabled={
                                    link.url === null
                                } className="btn yellow-button m-2">{label}</button>
                            );
                        })
                    }
                </Col>
            </Row>
        </>
    );
};

export default Admin;