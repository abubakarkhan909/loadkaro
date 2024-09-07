import React from 'react'
import { Link } from 'react-router-dom'
import './TextMedia.css'

function TextMedia(props) {
    const getClassNames = () => {
        let classNames = '';

        if (props.listItems && props.listItems.length > 0) {
            classNames += 'has-list-items ';
            const hasHierarchyItem = props.listItems.some(item => item.herarchyheading);
            if (hasHierarchyItem) {
                classNames += 'herarchymain ';
            }
        } else if (props.heading && props.paragraph && props.linkpath && props.linkName) {
            classNames += 'has-content ';
        } else {
            classNames += 'has-hierarchy ';
        }

        if (props.layout === 'left') {
            classNames += 'layout-left';
        } else if (props.layout === 'right') {
            classNames += 'layout-right';
        }

        return classNames.trim();
      }
    const textColor = props.bgcolor ? '#fff' : '';
    const paddingtopbottom = props.bgcolor ? '50px 0' : '0 0'
  return (  
    <div className={`textmedia ${getClassNames()}`}style={{ backgroundColor: props.bgcolor || 'initial' , padding:paddingtopbottom}}>
        <div className={props.usecontainer}>
            {props.showHeadingCenter && (
                    <div className='headingcenter'>
                        <h2>{props.headingenral}</h2>
                    </div>
                )}
            <div className={`pre_content ${textColor?"textcolorwhite": ""}`}>
            {props.listItems && props.listItems.length > 0 ? (
                        <ul>
                            {props.listItems.map((item, index) => (
                                <li key={index}>
                                    {item.herarchyheading ? (
                                        <div className='hierarchy_item'>
                                            <div className={`indexi ${textColor?"textcolorwhite": ""}`}>
                                                {index + 1}
                                            </div>
                                            <div className={`content`}>
                                                <h2>{item.herarchyheading}</h2>
                                                <p>{item.paragraph}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='listmedia'>
                                            <div className='list_img'>
                                                <img src={item.listImg} alt="" />
                                            </div>
                                            <div className='list_content'>
                                                <h3>{item.listHeading}</h3>
                                                <p>{item.listParagraph}</p>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) :(
                    <>
                        <h2>
                            {props.heading}
                        </h2>
                        <p>
                            {props.paragraph}
                        </p>
                        <Link to={props.linkpath} className='btn btn-primary'>
                            {props.linkName}
                        </Link>
                    </>
                )
                }
            </div>
            <div className='pre_img'>
                <img src={props.img}/>
            </div>
        </div>
    </div>
  )
}

export default TextMedia