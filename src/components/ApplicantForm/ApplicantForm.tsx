import React, { useState, useEffect } from 'react'

import { getNames } from '../../assets/api-calls'
import './ApplicantForm.scss'
import { skillsData, valuesData } from '../../assets/test-values-skills'

const ApplicantForm: React.FC = () => {
	const [username, setUsername] = useState<string>('')

	useEffect(() => {
		makeUserName()
	}, [])

	const makeUserName = async () => {
		let name = await getNames()
		setUsername(name)
	}

	const skills = () => {
		return skillsData.map((skill: {attribute:string}) => {
			return <button className="attribute-tag">{skill.attribute}</button>
		})
	}

	return (
		<main>
			<div className="new-applicant-container">
				<div className="applicant-profile">
					<img 
						className="applicant-icon"
						src={`https://avatars.dicebear.com/api/bottts/${username}.svg`} 
						alt="default user icon"
					/>
					<div>
						<h5>Enter your information below to create a profile</h5>
						<h6><label htmlFor="codename">Codename
						<img className="refresh-button" src="./refresh-pink.svg" alt="refresh-button"
							onClick={ async () => {
								makeUserName()
							}}
							/>
						</label></h6>
						<input id="codename" className="applicant-input" placeholder={username} disabled/>
						<label htmlFor="codename">Refresh to find your perfect anonymized codename</label>
						<h6><label htmlFor="bio">Bio</label></h6>
						<input id="bio" className="applicant-input" />
						<p>The following information will not be shared with employers:</p>
						<h6><label htmlFor="first-name">First Name</label></h6>
						<input id="first-name" className="applicant-input" />
						<h6><label htmlFor="last-name">Last Name</label></h6>
						<input id="last-name" className="applicant-input" />
						<h6><label htmlFor="email">Email</label></h6>
						<input id="email" className="applicant-input" />
					</div>
				</div>
				<div className="applicant-attributes">
				<h5>Select your skills and values</h5>
						<h5>Skills</h5>
					<div className="attribute-box">
						{skills()}
					</div>
						<h5>Values</h5>
					<div className="attribute-box">
						values were here
					</div>
				</div>
			</div>
    </main>
	)
}

export default ApplicantForm