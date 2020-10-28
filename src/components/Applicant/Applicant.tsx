import React, { useEffect, useState } from 'react'

import { ApplicantProfile } from '../../assets/definitions'
import { getApplicantById } from '../../assets/api-calls'
import { RouteComponentProps } from 'react-router-dom'

const Applicant: React.FC<RouteComponentProps> = (props) => {
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
    } else {
			const match:any = props.match.params
			getApplicantById(match.id)
        .then(response => {
					buildApplicant(response.data)
				})
    }
  }, [props.location.state, props.match.params])

const determineMatchedAttribute = (attribute: string, keyword: string, props: any):string => {
		if (props && props.attributeMatches[keyword][0] && props.attributeMatches[keyword][0].attribute === attribute) {
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