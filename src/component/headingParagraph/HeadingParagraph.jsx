import React from 'react'
import './HeadingParagraph.css'

function HeadingParagraph(props) {
  const { heading, paragraph, marginClass, headingType } = props;
  const headingClass = headingType === 1 ? 'headingType1' : 'headingType2';
  return (
    <div className={`headingSection ${headingClass} ${marginClass}`} >
     <h2>
        {props.heading}
     </h2>
     <p>
        {props.paragraph}
     </p>
    </div>
  )
}

export default HeadingParagraph