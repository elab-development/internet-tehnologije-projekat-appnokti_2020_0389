import React from 'react';
import PonudaServisi from "../components/PonudaServisi";
import Naslov from "../components/Naslov";
import Slider from "../components/Slider";

const Home = () => {
    return (
        <>
            <Naslov title="Neke od nasih usluga" subtitle=""/>
            <PonudaServisi />
        </>
    );
};

export default Home;