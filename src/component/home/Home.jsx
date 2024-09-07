import React,{useState,useEffect} from 'react'
import images from '../../images'
import CheckFare from '../formFare/CheckFare'
import Calendar from '../formFare/Calendar'
import ServiceType from '../formFare/ServiceType'
import PartialOption from '../formFare/PartialOptions';
import WeightType from '../formFare/WeightType'
import MaterialType from '../formFare/MaterialType'
import WhatsappScreen from '../formFare/WhatsappScreen'
import OtpScreen from '../formFare/OtpScreen'
import './Home.css'
import SliderComponent from '../slider/SliderComponent'
import Footer from '../footer/Footer'
import TextMedia from '../contentTextMedia/TextMedia'
import HeadingParagraph from '../headingParagraph/HeadingParagraph'
import Brands from '../brands/Brands'
import Testimonial from '../testimonial/Testimonial'
import Counter from '../counter/Counter'
import Faqs from '../faqs/Faqs'
import Header from '../header/Header'
import { useSelector } from 'react-redux';
import dummyData from './../dummyDatacard'
import LoadboardCarditem from '../LoadboardCard/LoadboardCarditem'
import { Link } from 'react-router-dom'

function Home({isLoggedIn, onLogout,onFooterVisibility, updateFormLastStep   }) {
const [showSuccessPopup, setShowSuccessPopup] = useState(false);
const currentStep = useSelector((state) => state.form.currentStep);
const partialStep = useSelector((state) => state.form.partialStep);
const formData = useSelector((state) => state.form.formData);
const [test,setTest]=useState(true);

 useEffect(() => {
    onFooterVisibility(currentStep === 1);
}, [currentStep, onFooterVisibility]);

const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CheckFare />;
      case 2:
        return <Calendar />;
      case 3:
        return <ServiceType />;
      case 4:
        if (formData.serviceType === 'Partial') {
        
          return <PartialOption />;
        } else {
          return <WeightType />;
        }
      case 5:
      
        if (formData.serviceType === 'Partial') {
            return <WhatsappScreen />;
        } else {
          return <MaterialType />;
        }
      case 6:
        if (formData.serviceType !== 'Partial') {
          return <WhatsappScreen />;
        } else {
          return <OtpScreen updateFormLastStep={updateFormLastStep}/>;
        }
      case 7:
        if (formData.serviceType !== 'Partial') {
          return <OtpScreen updateFormLastStep={updateFormLastStep}/>;
        } else {
          return null;
        }
      default:
        return null;
    }
  };

const closePopup = () => {
    setShowSuccessPopup(false);
};
  return (
    <>
   
    {currentStep === 1 ? (
        <div className='herosection'>
            <div className='inner'>
                <div className='leftie'>
                    <h2>Book Truck & Partial 
                    Load Service <img src={images.arrows} alt='arrows'/></h2>
                    <p>
                    Pakistan’s best online booking platform with live pricing
                    </p>
                </div>
                <div className='rightie'>
                    {renderStep()}
                </div>
            </div>
        </div>
     ) : (
      <div className='step-content'>
          {renderStep()}
      </div>
    )}
     {currentStep === 1 && <SliderComponent />}
     {currentStep === 1 && (
        <>
            <div className='loadboarddatamain'>
                <div className='container'>
                    <HeadingParagraph
                        marginClass="marginbottom50px"
                        heading="Load Board Orders" 
                        headingType={1} 
                        />
                    <div className='loadboardinner'>
                        <LoadboardCarditem  data={dummyData}/>
                        <Link to="/loadboard" className='btn btn-outline-primary mt-5 '>
                          All Order List
                        </Link>
                    </div>
                </div>
             </div>
            <div className='homeinner'>
                <div className='container'>
                <HeadingParagraph
                marginClass="marginbottom50px"
                heading="Our Strengths and Advantages"
                paragraph="Our strength lies in our reliable fleet and expert logistics, ensuring seamless transport solutions. With efficiency as our advantage, we deliver excellence in every journey."
                headingType={1} 
                />
                <TextMedia
                    usecontainer="container-fluid"
                    listItems={[
                    { listHeading: 'Full Load Services', listImg: `${images.truckIconp}`, listParagraph: 'We provide Full Truck load transportation services with varied type of trucks available with the click of a button.' },
                    { listHeading: 'Transparent Pricing', listImg: `${images.pricing}`, listParagraph: 'With our fare calculator, we instantaneously give you best possible rates online.' },
                    { listHeading: 'Get verified drivers', listImg: `${images.verified}`, listParagraph: 'Rest assured, our platform only connects you with verified drivers.' }
                    ]}
                    img={images.mockup}
                />
                </div>
                
                <Brands/>
                <div className='container mb-100px'>
                    <TextMedia
                    usecontainer="container-fluid"
                    heading="Protecting your cargo, protecting your journey"
                    paragraph="Our comprehensive insurance shields your cargo and business assets, ensuring peace of mind on every mile of your journey."
                    linkName="Get instant Quote"
                    linkpath="/about"
                    img={images.cargo}
                    />
                    <HeadingParagraph
                    marginClass="marginbottom50px"
                    heading="Simplify your freight operations with our all-in-one platform."
                    paragraph="Lorem ipsum dolor sit amet consectetur. Orci orci diam eget senectus adipiscing turpis nulla ut."
                    headingType={2} 
                    />
                    <img className='img-fluid' src={images.adminpic}/>
                </div>
                
                <TextMedia
                        usecontainer="container"
                        layout="left"
                        bgcolor="#124246"
                        showHeadingCenter={true}
                        headingenral="How it Works?"
                        listItems={[
                            { herarchyheading: 'Full Load Services', paragraph: 'We provide Full Truck load transportation services with varied type of trucks available with the click of a button.' },
                            { herarchyheading: 'Get instant pricing', paragraph: 'With our fare calculator, we instantaneously give you best possible rates online.' },
                            { herarchyheading: 'Stay in touch', paragraph: 'Rest assured, our platform only connects you with verified drivers.' }
                        ]}
                        img={images.imockup2}
                    />
                <Testimonial/>
                <div className="counterNumbers">
                    <div className='container'>
                    <div className='counterinner'>
                        <Counter number={105} title="Trucks" />
                        <Counter number={20} title="City Hub" />
                        <Counter number={50} title="Clients" />
                    </div>
                    <TextMedia
                    usecontainer="container-fluid"
                    heading="Become a captain, Join our network."
                    paragraph="Join loadkaro and be a leader. Maximize earnings, faster and easier than ever before! just on a click."
                    linkName="Driver Sign up"
                    linkpath="/driver_sign_up"
                    img={images.truck2} 
                    />
                    </div>
                </div>
                <Faqs
                usecontainer="container"
                rightLeftdir="right"
                
                />
            </div>
           
        </>
      )}
      {showSuccessPopup && (
        <div className="popup">
            <div className="popup-content">
                <h2>Form Submitted Successfully!</h2>
               
            </div>
        </div>
      )}
    </>
  )
}

export default Home