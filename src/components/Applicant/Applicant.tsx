import React, { useEffect, useState } from 'react'

import { ApplicantProfile } from '../../assets/definitions'
import { getApplicantById } from '../../assets/api-calls'
import { RouteComponentProps } from 'react-router-dom'
import './Applicant.scss'

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
    if (props 
      && props.attributeMatches 
      && props.attributeMatches[keyword][0] 
      && props.attributeMatches[keyword][0].attribute === attribute) {
      return 'attribute-tag highlight'
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
    <main className="Applicant">
			<span className="applicant-border">
				<div className="applicant-profile">
					<img 
						className="applicant-icon"
						src={`https://avatars.dicebear.com/api/bottts/${applicant.username}.svg`} 
						alt={`${applicant.username}'s icon`}
					/>
					<div className="applicant-info">
						<h2 className="username">{applicant.username}</h2> 
						<p>{applicant.bio}</p>  
					</div>
				</div>
				<div className="applicant-attributes">
					<div>
						<h5>Skills</h5>
						{attributeLists.skillTags}
					</div>
					<div>
						<h5>Values</h5>
						{attributeLists.valueTags}
					</div>
				</div>
			</span>
    </main>
  )
}

export default Applicant