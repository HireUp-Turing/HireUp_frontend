import React from 'react';

interface ApplicantPreviewProps {
  id: number
  username: string
  bio: string
  updated_at: string
  skills: Array<string>
  values: Array<string>
}

const ApplicantPreview: React.FC<ApplicantPreviewProps> = (props) => {
  return (
    <article>
      <h3>{props.username}</h3>
      <p>{props.bio}</p>
    </article>
  )
}

export default ApplicantPreview