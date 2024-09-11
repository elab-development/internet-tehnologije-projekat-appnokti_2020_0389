import React from 'react';
import Naslov from "../components/Naslov";
import ana from '../images/ana.enc';
import {Col, Row} from "react-bootstrap";
import {GiBigWave} from "react-icons/gi";
import {PiHandWaving} from "react-icons/pi";
import {FaAddressBook, FaPhone} from "react-icons/fa";
import {MdEmail} from "react-icons/md";

const About = () => {
    return (
        <>
            <Naslov title="O nama" subtitle=""/>

            <Row className="mt-5">
                <Col md={6}>
                    <img src={ana} alt="ana" className="img-fluid"/>
                </Col>
                <Col md={6}>
                    <h1 className="text-center">Zdravo svima <PiHandWaving /></h1>
                    <p>Zovem se <b>Ana Mihojevic</b> i bavim se svim uslugama vezane za nokte.
                    U svetu manikira sam vec 10 godina i imam veliko iskustvo u radu sa klijentima.
                    Ukoliko zelite da vas nokti izgledaju savrseno, onda ste na pravom mestu.
                    Radim sa najkvalitetnijim proizvodima i pratim sve trendove u svetu manikira.
                    Ukoliko zelite da zakazete termin, mozete me kontaktirati putem telefona ili emaila.
                    Radno vreme je od 08:00 do 20:00 svakog dana osim nedelje.
                    Radujem se vasem dolasku!
                    </p>
                    <p>
                        <FaAddressBook size={30}/>  <b>Adresa:</b>  Bulevar Kralja Aleksandra 123

                    </p>
                    <p>
                        <FaPhone size={30}/>  <b>Telefon:</b>  011/123-456
                    </p>
                    <p>
                        <MdEmail size={30}/>  <b>Email:</b> anamihojevic@gmail.com
                    </p>
                </Col>
            </Row>

        </>
    );
};

export default About;