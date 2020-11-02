import React from 'react';
import { Link } from 'react-router-dom'

import { ApplicantCard, Query } from '../../assets/definitions'
import './ApplicantPreview.scss'

const ApplicantPreview: React.FC<ApplicantCard> = (props) => {  
  const findProfileMatches = (keyword: string) => {
    const { skills, values }:any = props
    const container = keyword === 'skills' ? skills : values
    return props.query.query[keyword as keyof Query]
      .filter(attribute => container.includes(attribute.attribute) )  
  }

  const bioPreview = props.bio.substring(0, 180)
  const attributeMatches = {
    skills: findProfileMatches('skills'),
    values: findProfileMatches('values')
  }
     
  return (
    <Link
      to={{
        pathname: `/applicant/${props.id}`,
        state: {...props, attributeMatches} 
      }} 
      className="ApplicantPreview"
    >
        <div className="applicant-cards">
          <img 
            className="preview-icon"
            src={`https://avatars.dicebear.com/api/bottts/${props.username}.svg`} 
            alt={`${props.username}'s icon`}
          />
          <div className="applicant-info">
            <h3>{props.username}</h3>
            <p>{bioPreview}{bioPreview.length === 180 && '...'} </p>
          </div>
        </div>
        <div className="matched-attributes">
            <h4> 
              <span className="accent-text value-match">
                {attributeMatches.skills.length} / {props.query.query.skills.length}
              </span> skills match
            </h4>
            <h4> 
              <span className="accent-text value-match">
                {attributeMatches.values.length} / {props.query.query.values.length}  
              </span> values match
            </h4>
        </div>
    </Link>
  )
}

export default ApplicantPreview