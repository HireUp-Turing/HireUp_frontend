import React from 'react';

import { UserResults } from '../../assets/definitions'

const ApplicantPreview: React.FC<UserResults> = (props) => {
  return (
    <article className="applicant-cards">
      <h3>{props.username}</h3>
      <p>{props.bio}</p>
    </article>
  )
}

export default ApplicantPreview