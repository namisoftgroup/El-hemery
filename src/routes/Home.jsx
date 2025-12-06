import About from '../components/home/about'
import Gallery from '../components/home/Gallery'
// import Hero from '../components/home/hero'
import HeroSection from '../components/home/HeroSection'
import LocationsMap from '../components/home/LocationsMap'
import ServicesSection from '../components/home/Services'
import Tasbeeh from '../components/home/Tasbeeh'

export default function Home() {
  return (
    <>
    <HeroSection/>
    {/* <Hero /> */}
    <About/>
    <ServicesSection />
    <Tasbeeh />
    <Gallery />
    <LocationsMap/>
    </>
  )
}
