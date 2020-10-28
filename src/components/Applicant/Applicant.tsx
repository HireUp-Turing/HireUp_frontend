import {ApplicantProps, ApplicantProfile } from '../../assets/definitions'
import React, { useEffect, useState } from 'react';

const Applicant: React.FC<ApplicantProps> = (props) => {
  const [applicant, setApplicant] = useState<ApplicantProfile>({username: '', bio: '', skills: [], values: []})

  const buildApplicant = (info:any) => {
    setApplicant({
      username: info.username,
      bio: info.bio,
      skills: info.skills,
      values: info.values,
    })
  }

  useEffect(() => {
    if (props.location.state) {
      buildApplicant(props.location.state)
      console.log(applicant.username)
    } else {
      fakeFetch()
        .then(data => buildApplicant(data))
    }
  }, [props.location.state])

  const fakeFetch = async () => {
    return await {
      username: 'Champ',
      bio: 'I am the best easter egg of them all',
      skills: ['screens'],
      values: ['gold']
    }
  }

const determineMatchedAttribute = (attribute: string, keyword: string, props: any):string => {
		if (props.attributeMatches[keyword][0] && props.attributeMatches[keyword][0].attribute === attribute) {
      return 'attribute-tag-highlight'
    } else {
      return 'attribute-tag'
		}
	}

  const makeTags = (keyword:string) => {
    const { skills, values } = applicant
    const container = keyword === 'skills' ? skills : values
    return container.map((attribute, i) => {
      return (
        <p 
          className={determineMatchedAttribute(attribute, keyword, props.location.state)} 
          key={`${keyword}-${i}`}
        >
          {attribute}
        </p>
        )
      })
    }

    const attributeLists = {
    skillTags: makeTags('skills'),
    valueTags: makeTags('values')
  }

  return (
    <main className="">
      <img 
        className="applicant-icon"
        src={`https://avatars.dicebear.com/api/bottts/${applicant.username}.svg`} 
        alt={`${applicant.username}'s icon`}
      />
      <h2>{applicant.username}</h2> 
      <p>{applicant.bio}</p>  
      <div>
        <h4>Skills</h4>
        {attributeLists.skillTags}
        <h4>Values</h4>
        {attributeLists.valueTags}
      </div>
    </main>
  )
}

export default Applicant