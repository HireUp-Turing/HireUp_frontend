import React, { useState, useEffect, useReducer } from 'react'

import { getNames, getSearchOptions } from '../../assets/api-calls'
import './ApplicantForm.scss'

interface Creator {
	username?: string
	bio?: string
	first_name?: string
	last_name?: string
	email?: string
	skills?: Array<{attribute: string, id: number}>
	values?: Array<{attribute: string, id: number}>
}

const initialState = {
	username: '',
	bio: '',
	first_name: '',
	last_name: '',
	email: '',
	skills: [],
	values: []
}

const reducer = (state:object, actionType:{action:any, type:string}) => {
	return {
		...state,
		[actionType.type]: actionType.action
	}
}

const ApplicantForm: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [username, setUsername] = useState<string>('')
	const [tags, setTags] = useState<{skills:[], values:[]}>({
		skills:[], values:[]
	})

	useEffect(() => {
		dispatch({action:username, type:'username'})
	}, [username])

	const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		event.preventDefault()
		dispatch({
			action: event.target.value,
			type: event.target.id
		})
	}

	useEffect(() => {
		getSearchOptions()
		.then(response => {
			setTags(response.data[0])
		})
		makeUserName()
	}, [])

	const makeUserName = async () => {
		let name = await getNames()
		setUsername(name)
	}

const tagHandler = (event:any) => {
		// const button<any> = event.target
		console.log("ID", event.target.id)
		console.log("value", event.target.name)
		// if a skill is highlighted/clicked
		// 
	}

const makeTags = (tags:Array<{attribute:string, id:number}>) => {
		return tags.map(tag => {
			return (
			<button 
				className="attribute-tag" 
				name={tag.attribute} 
				id={`${tag.id}`} 
				key={tag.attribute}
				onClick={tagHandler}>
					{tag.attribute}
			</button>
			)
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
						<textarea
							disabled
							id="username"
							className="applicant-input"
							placeholder={username}
							rows={1}
						/>
						<label htmlFor="username" className="privacy-notice">Refresh to find your perfect codename</label>
						<h6><label htmlFor="bio">Bio</label></h6>
						<textarea
							id="bio"
							className="applicant-input"
							onChange={handleFormChange}
							rows={4}
						/>
						<p className="privacy-notice">The following information will not be shared with employers:</p>
						<h6><label htmlFor="first_name">First Name</label></h6>
						<textarea
							id="first_name"
							className="applicant-input" 
							onChange={handleFormChange}
							rows={1}
						/>
						<h6><label htmlFor="last_name">Last Name</label></h6>
						<textarea
							id="last_name"
							className="applicant-input" 
							onChange={handleFormChange}
							rows={1}
						/>
						<h6><label htmlFor="email">Email</label></h6>
						<textarea
							id="email"
							className="applicant-input" 
							onChange={handleFormChange}
							rows={1}
						/>
					</div>
				</div>
				<div className="applicant-options">
				<h5>Select your skills and values</h5>
						<h6>Skills</h6>
					<div className="option-box">
						{makeTags(tags.skills)}
					</div>
						<h6>Values</h6>
					<div className="option-box">
						{makeTags(tags.values)}
					</div>
				</div>
			</div>
			<button className="cta-button" style={{ margin: '1em auto' }}>create your profile</button>
    </main>
	)
}

export default ApplicantForm