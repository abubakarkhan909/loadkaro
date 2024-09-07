import React from 'react'
import CountUp from "react-countup";
import { useInView } from 'react-intersection-observer';
import './Counter.css'

function Counter({ number, title }) {
    const { ref, inView } = useInView({
        triggerOnce: true, 
        threshold: 0.5,
      });
  return (
    <div className="numbercounter" ref={ref}>
      {inView ? (
        <>
            <CountUp duration={10} className="counter" end={number} />
            <span>+</span>
        </>
      ) : (
        <>
        <span className="counter">0</span>
        </>
      )}
      <div className='title'>{title}</div>
    </div>
  )
}

export default Counter