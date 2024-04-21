import './home.css'
import missionImg from '../../assets/images/eye-img.png'
import onboardingImg from '../../assets/images/Onboarding-picture.png'
import { categoriesHome, testimonials } from '../../constants'
import Hero from '../../components/hero-section/Hero'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow } from 'swiper/modules';
import { useUser } from '../../context/UserContext'
import VendorHero from '../../components/vendorHero/VendorHero'

const Home = () => {

    const { user } = useUser();

  return (
    <>
        {/* hero section */}
        {(user && user.role.toLowerCase() == "vendor") ? <VendorHero/> : <Hero/> }
        {!user && <Hero/>}

        {/* mission */}
        <section className='mission padding-y'>
            <div className='mission-text'>
                <h2>Our Mission</h2>
                <p>Our mission is to make it easy for Nigerians to find all kinds of services in one place. We want to help people connect with trustworthy professionals and showcase their own skills. By doing this, we hope to make it simpler for everyone to get things done and create more opportunities for businesses and individuals across Nigeria.</p>
            </div>
            <img src={missionImg} alt="eye image" />
        </section>

        {/* app works */}
        {/* using same class name here becase they have same styling */}
        <section className='mission padding-y'>
            <img src={onboardingImg} alt="phone image" />
            <div className='mission-text'>
                <h2>How our app works</h2>
                <p>Our mission is to make it easy for Nigerians to find all kinds of services in one place. We want to help people connect with trustworthy professionals and showcase their own skills. By doing this, we hope to make it simpler for everyone to get things done and create more opportunities for businesses and individuals across Nigeria.</p>
            </div>
        </section>

        {/* category display */}
        <section className='categories'>
            <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 2.5,
                slideShadows: false,
            }}
            modules={[EffectCoverflow]}
            className='swiper_container'>

                {categoriesHome.map((category, index) => (
                    <SwiperSlide key={index} >
                    <img src={category.imgUrl} alt={category.imgAlt} />
                    <p>{category.text}</p>
                 </SwiperSlide>
                ))}

            </Swiper>
        </section>

        {/* testimonial  */}
        <section className='testimonial padding-y'>
            {testimonials.map((item) => (
                <div key={item.id} className='testi-card'>
                    <img src={item.imgUrl} alt={item.imgAlt} />
                        <h3>
                            {item.name}
                        </h3>
                        <p>{item.testimony}</p>
                </div>
            ))}
        </section>
        
    </>
  )
}

export default Home