import React from 'react';
import building_icon from '../images/building-icon.png';
import flash_icon from '../images/flash-icon.png';
import industrial_icon from '../images/industrial-icon.png';
import bulb_icon from '../images/bulb-icon.png';
import {FaAddressBook, FaArrowRight} from "react-icons/fa";
import {GiBookStorm, GiHammerNails, GiNails, GiWomanElfFace} from "react-icons/gi";
import {FaNairaSign} from "react-icons/fa6";
import {ImWoman} from "react-icons/im";


const PonudaServisi = () => {

    let data = [
        {
            id: 1,
            icon: <FaAddressBook size={60} style={
                {
                    color: "white",
                    borderRadius: "50%",
                    padding: "10px"
                }
            }/>,
            activeClass: '',
            title: "Manikir",
            text: 'Manikir kod nas podrazumeva tretman ruku, noktiju i kože oko noktiju. Manikir je tretman koji se radi kako bi se ruke održavale u dobrom stanju, a nokti zdravi i lepi. Manikir se radi u kozmetičkim salonima, a može se raditi i kod kuće. Manikir se radi kako bi se ruke održavale u dobrom stanju, a nokti zdravi i lepi. Manikir se radi u kozmetičkim salonima, a može se raditi i kod kuće.',
            link: "/services"
        },
        {
            id: 2,
            icon: <GiBookStorm size={60} style={
                {
                    color: "white",
                    borderRadius: "50%",
                    padding: "10px"
                }
            }/>,
            activeClass: 'active',
            title: "Pedikir",
            text: "Pedikir je tretman stopala koji se radi kako bi se stopala održavala u dobrom stanju, a nokti zdravi i lepi. Pedikir se radi u kozmetičkim salonima, a može se raditi i kod kuće. Pedikir je tretman stopala koji se radi kako bi se stopala održavala u dobrom stanju, a nokti zdravi i lepi. Pedikir se radi u kozmetičkim salonima, a može se raditi i kod kuće.",
            link: "/services"
        },
        {
            id: 3,
            icon: <ImWoman size={60} style={
                {
                    color: "white",
                    borderRadius: "50%",
                    padding: "10px"
                }
            }/>,
            activeClass: '',
            title: "Izlivanje noktiju",
            text: "Izlivanje noktiju je tretman koji se radi kako bi se nokti ojačali i produžili. Izlivanje noktiju se radi u kozmetičkim salonima, a može se raditi i kod kuće. Izlivanje noktiju je tretman koji se radi kako bi se nokti ojačali i produžili. Izlivanje noktiju se radi u kozmetičkim salonima, a može se raditi i kod kuće.",
            link: "/services"
        },
        {
            id: 4,
            icon: <GiWomanElfFace size={60} style={
                {
                    color: "white",
                    borderRadius: "50%",
                    padding: "10px"
                }
            }/>,
            activeClass: '',
            title: "Nadogradnja noktiju",
            text: "Nadogradnja noktiju je tretman koji se radi kako bi se nokti produžili. Nadogradnja noktiju se radi u kozmetičkim salonima, a može se raditi i kod kuće. Nadogradnja noktiju je tretman koji se radi kako bi se nokti produžili. Nadogradnja noktiju se radi u kozmetičkim salonima, a može se raditi i kod kuće.",
            link: "/services"
        }
    ]

    return (
        <>
            <div className="service_section layout_padding">
                <div className="container-fluid">
                    <div className="service_section_2">
                        <div className="row">

                            {
                                data.map((item) => {
                                    return (
                                        <div key={item.id} className="col-lg-3 col-sm-6">
                                            <div className={`service_box ${item.activeClass}`}>
                                                <div className="building_icon">{item.icon}</div>
                                                <h4 className="residential_text">{item.title}</h4>
                                                <p className="service_text">{item.text}</p>
                                            </div>
                                            <div className={`readmore_bt ${item.activeClass}`}><a href={item.link}>Vise o tome</a></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PonudaServisi;