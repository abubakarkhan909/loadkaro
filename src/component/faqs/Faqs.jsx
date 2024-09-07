import React, { useEffect, useState } from 'react';
import './Faqs.css'
import images from '../../images';

const Faqs = (props) => {
    const faqsData =[
      {
        id: 1,
        question: "How to book a Truck online with loadkaro?",
        answer: `Loadkaro offers an online transport booking service around the country to individuals and businesses.
        The material types that are mostly transported from various locations through road transport are Trailer Transport, FMCG Transporter, Textile & Garments, Manufacturing, Cosmetics, Solar Panel, Construction Plastic, Chemical, Ceramics, and more.
    
        This transport company offers highly affordable transport services combined with complete security of goods through insurance assistance, vehicle tracking, easy online payments, and more. We also allow customers to choose the vehicle of their choice based on the material to be transported.
    
        You just need to check on the website for online truck booking, provide location details, and proceed with further details of the material for full truck booking or part load truck that suits your requirements. You can avail our highly professional services through controlled prices, secure movement of goods with tracking services, and safe delivery.`
      },
        { "id": 2, "question": "Why should I choose Trukky for transport service?",
          "answer":`Trukky is known for presenting the customers with safe, 
          convenient and goods transportation service in India. We help the clients to manage
           all your daily transport-related issues through the truck booking services.
            We have come up with an exclusive platform for the customers to get a trouble-free
             and affordable movement of consignments to different locations around the nation.
            Now searching for the best transporters in your city would be easy as Trukky is all set to serve the
             customers with 
            safe and affordable transportation of goods. The instant pricing mechanism built through the 
            system providing real-time pricing. The easy payment system from the time of loading
             till delivering is helping in saving the cost of transportation to a greater extent. 
             The tracking facility helps in monitoring the trip from the loading till unloading 
             on the dropoff location.The support facility is available 24/7 to help you in any of
              your need with professionalism.` },
        { "id": 3, "question":"What type of Services does Trukky provide?",
          "answer":`Trukky provides services in full Truck and a part load truck
           for business and personal requirement. We have come up with an exclusive
            platform for the customers to get a trouble-free and affordable movement
             of consignments to different locations around the nation. From business
              to personal goods movement, Trukky provides the lowest prices for movement
               of goods including the extra discounts and insurance on cheapest rates.
               We are serving with more than 3000 vehicles including trucks, lorries,
                trailers serving in over 100 cities in the country. The heavy vehicle
                 types we serve are 40 feet Containers,10 tyre Single Axle,8 Ton Truck,
                 18 Ton Truck,20 Ton Truck etc. the customers can choose a perfect
                  option according to the material they need to transport.
                   The part load facility helps you in saving cost through shared
                   load truck facility available subject to the dimensions of the material you need to upload and deliver.` },
        { "id": 4, "question": "How can I insure my goods during the trip?",
          "answer":`
          Trukky provides the simplest way of booking transportation on the cheapest rates with quality services. You do not need to pay anything while booking, partial or full payment can be made at the time of loading and the remaining amount can be paid at the time of unloading. The multiple modes of payment facility help the users in making secure transactions through the system.
All on-line payments made towards availing Services shall be taken into consideration only when the relevant amount is received and credited in the Company's bank account. The User booking for the Service shall pay all amounts including the fare, parking charges, additional night surcharge if applicable and any fee or levy presently payable or hereinafter imposed by the law or required to be paid for availing of the Services.
          ` },
        { "id": 5, "question": "How can I insure my goods during the trip?" ,
          "answer":`Trukky provides insurance services for securing and ensuring the safe movement of the material and the goods. You can avail the insurance services by contacting the customer services whiling booking a trip. You can now keep your goods secured through insurance at very low price.
It is important to think about safety while transporting goods therefore, make sure that the service providers offer insurance assistance features with the transport service through best transporters. This will help you stay calm and assured about the safety of your goods.`
         }
    ]
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFaqs(faqsData);
  }, []);

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className='faqsmain'>
      <div className={props.usecontainer}>
        <div className={`faqsinner ${props.rightLeftdir}`}>
          <div className='pre_heading'>
            <h2>
              <span>
                Frequently<br/> asked <br/> questions
              </span>
            </h2>
          </div>
          <div className='content'>
            <ul>
              {faqs.map((faq, index) => (
              <li key={faq.id}>
                  <div className={`headfaqs ${openFaq === index ? "openhead":""}`} 
                  onClick={() => toggleFaq(index)
                   
                  }>
                  <h3>{faq.question}</h3>
                  <span>
                      <img src={images.plusicon} className={openFaq === index ? 'crossicon' : ''}/>
                  </span>
                  </div>
                  <div className={`detail ${openFaq === index ? "opendetail" : ""}`}
                  style={{ 
                      height: openFaq === index ? 'auto' : '0', 
                      borderWidth: openFaq===index?'1px':'0'
                  }}
                  >
                  <p >{faq.answer}</p>
                  </div>
              </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
