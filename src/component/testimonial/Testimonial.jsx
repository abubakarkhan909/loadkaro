import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Testimonial.css'
import images from '../../images';

// Dummy data for testimonials
const dummyTestimonials = [
    { image:`${images.testo}`, text: "We've been working with loadkaro for years now, and they continue to exceed our expectations. Their ability to handle diverse freight types and navigate complex routes with ease is unparalleled. Plus, their advanced tracking systems provide us with real-time visibility, which is crucial for our operations. Thank you, loadkaro, for being a reliable partner!", author: "John Doe",date:"May 09 2024" },
    { image:`${images.ab}`,text: "We've been working with loadkaro for years now, and they continue to exceed our expectations. Their ability to handle diverse freight types and navigate complex routes with ease is unparalleled. Plus, their advanced tracking systems provide us with real-time visibility, which is crucial for our operations. Thank you, loadkaro, for being a reliable partner!", author: "Abubakar khan",date:"May 09 2024" },
    { image:`${images.brand1}` ,text: "We've been working with loadkaro for years now, and they continue to exceed our expectations. Their ability to handle diverse freight types and navigate complex routes with ease is unparalleled. Plus, their advanced tracking systems provide us with real-time visibility, which is crucial for our operations. Thank you, loadkaro, for being a reliable partner!", author: "Alice Johnson",date:"May 09 2024" }
  ];
const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    setTestimonials(dummyTestimonials);
  }, []);

  const settings = {
    arrows:false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="testimonial-slider">
        <div className='container'>
            <Slider {...settings}>
                {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-item">
                    <div className='testimonialinner'>
                        <div className='testIcon'>
                            <img src={testimonial.image} alt="" />
                        </div>
                        <div className='content'>
                            <h4>{testimonial.author}</h4>
                            <p>{testimonial.text}</p>
                            <div className='date'>
                                {testimonial.date}
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </Slider>
        </div>
    </div>
  );
};

export default Testimonial;
