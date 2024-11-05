import React from 'react'
import HeroSection from './HeroSection'
import OptimizationSection from './OptimizationSection'
import ROISection from './ROISection'
import Testimonials from './Testimonials'
import FAQSection from './FAQSection'
import FeaturesSection from './FeaturesSection'
import Slider from './Slider'
import vid1 from '../../../public/assets/vid1.mp4';
import vid2 from '../../../public/assets/vid2.mp4';
import Chatbot from './Chatbot'
 import { useAuth } from '../../API/auth'
import Hero from '../DashboardScreens/Hero'
function Home() {

  const {isLoggedIn,Logoutuser} =useAuth()
  return (
    <>
    {isLoggedIn?
       <>
        <Hero/>
       </>
       :
       <>
        <HeroSection/>
        <FeaturesSection />
        <Slider />
        <OptimizationSection title="Boost Your Results with AI Marketer" videoSrc={vid1} />
        <ROISection />
        <OptimizationSection title="Outpace the competition" videoSrc={vid2} />
        <Testimonials />
        <FAQSection />
        <Chatbot/>
       </>
       
        }
    </>
  )
}

export default Home