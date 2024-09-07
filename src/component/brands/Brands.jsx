import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import images from '../../images';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Brands.css'

const mockData =[
    { "id": 1, "image": `${images.brand1}` },
    { "id": 2, "image": `${images.brand2}` },
    { "id": 3, "image": `${images.brand3}` },
    { "id": 4, "image": `${images.brand4}` },
    { "id": 4, "image": `${images.brand5}` },
    { "id": 4, "image": `${images.brand1}` },
]
function Brands() {
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        setBrands(mockData);
    }, []);
  
    const settings = {
      arrows:false,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,  
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,  
          settings: {
            slidesToShow: 2, 
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 576, 
          settings: {
            slidesToShow: 2.5,  
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 375, 
          settings: {
            slidesToShow: 1,  
            slidesToScroll: 1,
          }
        }
      ]
    };
      
  return (
    <div className='brandsMain'>
        <div className='container'>
            <h3>
                OUR CLIENTS 
            </h3>
            <Slider {...settings}>
                {brands.map((item, index) => (
                    <li key={index}>
                        <img src={item.image} alt="" />
                    </li>
                ))}
            </Slider>
        </div>
    </div>
  )
}

export default Brands