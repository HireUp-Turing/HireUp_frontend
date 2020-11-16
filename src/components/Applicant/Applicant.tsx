import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import  MessageForm from '../MessageForm/MessageForm'
import { ApplicantProfile } from '../../assets/definitions'
import { getApplicantById } from '../../assets/api-calls'
import { AuthContext, MessageFormContext } from '../../contexts'
import './Applicant.scss'

const Applicant: React.FC<RouteComponentProps> = (props) => {
  const [applicant, setApplicant] = useState<ApplicantProfile>({username: '', bio: '', skills: [], values: []})
  const [messageForm, showMessageForm] = useState<boolean>(false)

  const buildApplicant = (info:any) => {
    setApplicant({
      username: info.username,
      bio: info.bio,
      skills: info.skills,
      values: info.values,
    })
  }

  useEffect(() => {
		// the commented out code here will be put to use when we clean the data
    // if (props.location.state) {
      // buildApplicant(props.location.state)
    // } else {
			const match:any = props.match.params
			getApplicantById(match.id)
        .then(response => {
					buildApplicant(response.data)
				})
    // }
  }, [props.location.state, props.match.params])

const determineMatchedAttribute = (attribute: string | undefined, keyword: string, props: any):string => {
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
          className={determineMatchedAttribute(attribute.attribute, keyword, props.location.state)} 
          key={`${keyword}-${i}`}
        >
          {attribute.attribute}
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
            <div className="profile-top-line">
              <h2 className="username">{applicant.username}</h2> 
              <AuthContext.Consumer>
                {({ auth }) => {
                  const match:any = props.match.params
                  if (auth !== parseInt(match.id)) {
                  return (
                    <img 
                      src={`/chat-${messageForm ? 'pink': 'gray'}.svg`}
                      alt='message icon' 
                      className="message-icon" 
                      title='send this user a message' 
                      onClick={() => {
                        showMessageForm(!messageForm)
                      }}
                    />
                  )}
                }}
              </AuthContext.Consumer>
            </div>
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
      {messageForm && 
        <MessageFormContext.Provider value={{ messageForm, showMessageForm }}>
          <MessageForm {...props}/>
        </MessageFormContext.Provider>
      }
    </main>
  )
}

export default Applicant