import React from 'react'
import NavBar from '../components/NavBar/NavBar';
import LandingOne from '../components/LandingSection/LandingOne';
import Trainer from '../components/TrainerSection/Trainer';
import LandingTwo from '../components/LandingSection/LandingTwo';
import Plans from '../components/Plans/Plans';
import Testimonials from '../components/Testimonials/Testimonials';
import Footer from '../components/Footer/Footer';


function LandingPage() {
    return (
        <React.Fragment>
            <NavBar/>
            <LandingOne/>
            <LandingTwo/>
            <Trainer/>
            <Plans/>
            <Testimonials/>
            <Footer/>
        </React.Fragment>
    )
}

export default LandingPage