import "./hero.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper/modules";
import { categoriesHero } from "../../constants";
import SearchBar from "../search-bar/SearchBar";

const CategoryHero = () => {

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Generate random index
          [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
      };
      
      // Shuffle the categoriesHore array
      const shuffledCategories = shuffleArray(categoriesHero);

  return (
    <section>
      <div className="hero-category">
        <SearchBar />
        {/* <div className='hero-text'>
                <h1>&ldquo; Discover Trusted Service Providers in Nigeria &rdquo;</h1>
                <p>Whether you&apos;re a service seeker looking for quality assistance or a talented individual ready to showcase your skills. Join us today and unlock a world of opportunities!</p>
                </div> */}
      </div>
      <Swiper
        // spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        // slidesPerView={"1"}
        modules={[Autoplay]}
        className="category-slides">
        {shuffledCategories.map((category, index) => (
          <SwiperSlide key={index}>
            <img src={category.imgUrl} alt={category.imgAlt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoryHero;
