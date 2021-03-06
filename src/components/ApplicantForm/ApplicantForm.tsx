import React, { useState, useEffect, useReducer } from 'react'
import { Redirect } from 'react-router-dom'

import { getNames, getAttributes, postApplicant } from '../../assets/api-calls'
import { NewApplicant, ApiAttribute } from '../../assets/definitions'
import { AuthContext } from '../../contexts'
import './ApplicantForm.scss'

const initialState = {
	username: '',
	bio: '',
	first_name: '',
	last_name: '',
	email: '',
	skills: [],
	values: []
}

const reducer = (state:NewApplicant, update:{payload:any, type:string}) => {
	switch(update.type) {
		case 'username':
		case 'bio':
		case 'first_name':
		case 'last_name':
		case 'email':
			return {
				...state,
				[update.type]: update.payload
			}
		case 'skills':
		case 'values':
			if (state[update.type].includes(update.payload)) {
				return {
					...state,
					[update.type]: state[update.type].filter(id => id !== update.payload)
				}
			} else {
				return {
					...state,
					[update.type]: [...state[update.type], update.payload]
				}
			}
		default:
			return {
				...state
			}
	}
}

const ApplicantForm: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [username, setUsername] = useState<string>('')
	const [successfulPost, setSuccessfulPost] = useState<boolean>(false)
	const [newApplicant, setNewApplicant] = useState<NewApplicant>({ username: '', bio: '', skills: [], values: [] })
	const [tags, setTags] = useState<{skills:[], values:[]}>({
		skills:[], values:[]
	})

	useEffect(() => {
		dispatch({payload:username, type:'username'})
	}, [username])
	
	useEffect(() => {
		getTagData()
			.then(response => {
				setTags(response)
			})
		makeUserName()
	}, [])

	const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		event.preventDefault()
		dispatch({
			payload: event.target.value,
			type: event.target.id
		})
	}

	const makeUserName = async () => {
		let name = await getNames()
		setUsername(name)
	}

	const getTagData = async () => ({
		skills: await getAttributes('skills'),
		values: await getAttributes('values')
	})

	const makeTags = (tags:Array<ApiAttribute>, type:string) => {
		const attributes = type === 'skills' ? state.skills : state.values

		return tags.map((tag, i) => {			
			return (
				<div className="tag-button-box" key={`${type}-container-${i}`}>
				<button
					className={`attribute-tag ${attributes.includes(tag.id) ? "highlight" : ""}`}
					name={tag.attribute}
					id={`${tag.id}`}
					key={i}
					onClick={() => {
						dispatch({payload: tag.id, type: type})
					}}>
						{tag.attribute}
				</button>
				{(i !== 0 && i % Math.ceil(tags.length / 5) === 0) &&
					<br />}
				</div>
			)
		}
	)}

	const createNewApplicant = () => {
		postApplicant(state)
			.then(response => {
				setNewApplicant(response.data)
				setSuccessfulPost(true)
			})
			.catch(error => {
				console.error(error)
			})
	}

	return (
		<main className="ApplicantForm">
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
							maxLength={250}
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
						{makeTags(tags.skills, 'skills')}
					</div>
						<h6>Values</h6>
					<div className="option-box">
						{makeTags(tags.values, 'values')}
					</div>
				</div>
			</div>
			<button
				className="cta-button"
				style={{ margin: '1em auto' }}
				onClick={createNewApplicant}
			>
				create your profile
			</button>
			{successfulPost &&
					<AuthContext.Consumer>
						{({ setAuth }) => {
							setAuth(newApplicant.id)
							return (
								<Redirect
								to={{pathname: `/applicant/${newApplicant.id}`, state: newApplicant}}
								/>
								)}}
					</AuthContext.Consumer> 
			}
    </main>
	)
}

export default ApplicantForm