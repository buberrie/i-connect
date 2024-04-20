import SearchBar from "../search-bar/SearchBar"
import './style.css'

const Hero = () => {
  return (
    <>
    <section className='hero'>
            <div className='hero-content'>
                <SearchBar/>
                <div className='hero-text'>
                <h1>&ldquo; Discover Trusted Service Providers in Nigeria &rdquo;</h1>
                <p>Whether you&apos;re a service seeker looking for quality assistance or a talented individual ready to showcase your skills. Join us today and unlock a world of opportunities!</p>
                </div>
            </div>
        </section>
    </>
  )
}

export default Hero