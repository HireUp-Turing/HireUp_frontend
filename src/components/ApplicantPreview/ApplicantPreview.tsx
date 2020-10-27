import React from 'react';

import { ApplicantCard, Query } from '../../assets/definitions'
import { skillsData } from '../../assets/test-values-skills';
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
    <div className="ApplicantPreview">
      <div className="applicant-cards">
        <img 
          className="applicant-icon"
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
    </div>
  )
}

export default ApplicantPreview