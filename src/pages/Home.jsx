import Info from "../components/Info"
import SectionToggle from "../components/SectionToggle"
// particles
import ParticlesBg from 'particles-bg'

const Home = () => {
  return (
    <>
      <Info />
      <SectionToggle />
      <ParticlesBg type="cobweb" bg={true} color="#e5bc29" /> 
    </>
  )
}

export default Home
