import React,{useRef,useState} from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './SliderComponent.css'
import images from '../../images';
import CustomArrows from './CustomArrows';

function SliderComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
    const slides = [
      {
        image: `${images.half_body_truck}`,
        heading: 'Halfbody Trailers',
        categories: '6,10,14 and 22 wheelers',
        weight: 'Up to 60 tonnes'
      },
        {
          image: `${images.shehzore}`,
          heading: 'Shehzore',
          weight: 'Up to 3 tonnes'
        },
        {
          image: `${images.container_truck}`,
          heading: 'Containerised Trailers',
          weight: 'Up to 60 tonnes'
        },
       
        {
          image: `${images.mazda}`,
          heading: 'Mazda',
          weight: 'Up to 14 tonnes'
        },
        {
          image: `${images.flatbed}`,
          heading: 'Flatbed Trailers',
          categories: '6,10,14 and 22 wheelers',
          weight: 'Up to 60 tonnes'
        },
        {
          image: `${images.pickup}`,
          heading: 'Pickup',
          weight: 'Up to 1 ton'
        },

      ];    
     
    const settings = slides.length > 1 ? {
        arrows:false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        fade: true,
        cssEase: 'linear',
        beforeChange: (current, next) => setActiveIndex(next),
      }: {
        dots: false,
        arrows:false,
        infinite: false,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
      };
      const handleDotClick = (index) => {
        setActiveIndex(index);
        sliderRef.current.slickGoTo(index);
      };
      const renderDots = () => {
        return (
          <ul className="slick-dots">
            {slides.map((_, index) => (
              <li
                key={index}
                className={index === activeIndex ? "slick-active" : ""}
                onClick={() => handleDotClick(index)}
              >
                <div className="custom-dot"></div>
              </li>
            ))}
          </ul>
        );
      };
     
  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slidecontent">
            <div className='sliderinner'>
                    <img src={slide.image} alt={`Slide ${index + 1}`} />    
                <div className='detail'>
                    <div className='detailinner'>
                        <h2>{slide.heading}</h2>
                        <div>
                        {slide.categories && (
                          <p><span>Categories</span> {slide.categories}</p>
                        )}
                          
                          <p><span>Weight capacity</span>{slide.weight}</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </Slider>
      <CustomArrows
        onPrevClick={() => sliderRef.current.slickPrev()}
        onNextClick={() => sliderRef.current.slickNext()}
        dots={renderDots()}
      />
    </div>
  )
}

export default SliderComponent