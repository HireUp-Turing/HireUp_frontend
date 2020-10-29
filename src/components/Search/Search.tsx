import React, { useReducer, useEffect, SyntheticEvent } from 'react'
import { skillsData, valuesData } from '../../assets/test-values-skills'
import { Redirect } from 'react-router-dom'

import './Search.scss'
import { OpenMenuContext } from '../../contexts'
import { AttributeList } from '../../assets/definitions'

const initialState = {
	skills: [],
	values: [],
	runSearch: false
}

function reducer(state:object, update:{type:string, change:any}) {
	return {
		...state,
		[update.type]: update.change
	}	
}

const Search: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		fakeFetch()
			.then(options => {
				Object.keys(options).forEach(option => {
					const checkboxes = options[option as keyof AttributeList].map(attribute => {
						const checkbox = Object.assign(attribute)
						checkbox.checked = false
						return checkbox
					})
					dispatch({type: option, change: checkboxes})
				})
			})
	}, [])

	const fakeFetch = async () => {
		return await {
			skills: skillsData,
			values: valuesData
		}
	}
	
	const updateSelections = (event: SyntheticEvent, type:string, selection: string) => {
		const change:any = state[type]
		const markedAttribute = change
			.filter((option:any) => option.attribute === selection)
		const index = state[type].indexOf(markedAttribute[0])
		change[index].checked = change[index].checked ? false : true;
		dispatch({type, change})
	}
	
	const makeOption = (options:Array<object>, type:string) => {
		return options.map((option:any, i) => {
			return (
				<button 
					className={option.checked ? 'attribute-tag highlight' : 'attribute-tag'}
					key={`${type}-option-${i}`}
					onClick={(event) => {
						event.preventDefault()
						updateSelections(event, type, option.attribute)
					}}
				>
					{option.attribute}
				</button>
			)
		})
	}

	const makeQuery = () => {
		return {
			skills: state.skills.filter((skill:any) => skill.checked),
			values: state.values.filter((value:any) => value.checked)
		}
	}

	const runSearch = () => {
		dispatch({type: 'runSearch', change:true})
	}

	return (
		<OpenMenuContext.Consumer>
			{({toggleMenu}) => (
				<form 
					className="Search" 
					onSubmit={runSearch} 
				>
					<h2>Find Applicants</h2>
					<label htmlFor="skills-options" className="form-label">
						What <span className="accent-text">skills</span> are you hiring for?
					</label>
					<section id="skills-options" className="options">
						{makeOption(state.skills, "skills")}
					</section>
					<label htmlFor="values-options" className="form-label">
						What are your company <span className="accent-text">values</span>?
					</label>
					<section id="values-options" className="options">
						{makeOption(state.values, "values")}
					</section>
					<button 
						className="cta-button" 
						onClick={(event) => {
							event.preventDefault()
							toggleMenu()
							runSearch()
						}}
					>
						Search
					</button>
					{state.runSearch && 
						<Redirect 
						to={{
							pathname: "/search-results",
							state: { query: makeQuery() }
						}}
						/>
					}
				</form>
			)}
		</OpenMenuContext.Consumer>
	)
}

export default Search