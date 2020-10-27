import React from 'react';

import { UserResults } from '../../assets/definitions'
import './ApplicantPreview.scss'

const ApplicantPreview: React.FC<UserResults> = (props) => {

  const bioPreview = props.bio.substring(0, 180)

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
      <p className="matched-attributes">
          <h4> 
            <span className="accent-text">3/4</span> skills match
          </h4>
          <h4> 
            <span className="accent-text"> 3/4</span> values match
          </h4>
      </p>
    </div>
  )
}

export default ApplicantPreview