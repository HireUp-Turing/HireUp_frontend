import React, { useState } from 'react'

import { getNames } from '../../assets/api-calls'
import './ApplicantForm.scss'

const ApplicantForm: React.FC = () => {
	const [username, setUsername] = useState<string>('')

	return (
		<main className="Applicant">
			<span className="applicant-border">
				<div className="applicant-profile">
					<img 
						className="applicant-icon"
						src={`https://avatars.dicebear.com/api/bottts/${username}.svg`} 
						alt="default user icon"
					/>
					<div className="applicant-info">
						<h5>Enter your information below to create a profile</h5>
						<label htmlFor="first-name">First Name</label>
						<input id="first-name" className="applicant-input" />
						<label htmlFor="last-name">Last Name</label>
						<input id="last-name" className="applicant-input" />
						<label htmlFor="email">Email</label>
						<input id="email" className="applicant-input" />
						<label htmlFor="bio">Bio</label>
						<input id="bio" className="applicant-input" />
						<label htmlFor="bio">Codename</label>
						<button
							onClick={ async () => {
								let name = await getNames()
							setUsername(name)
							}}
						>
							refresh
						</button>
						<p>{username}</p>
					</div>
				</div>
				<h5>Select your skills and values</h5>
				<div className="applicant-attributes">
					<div className="attribute-box">
						<h5>Skills</h5>
						skills were here
					</div>
					<div className="attribute-box">
						<h5>Values</h5>
						values were here
					</div>
				</div>
			</span>
    </main>
	)
}

export default ApplicantForm