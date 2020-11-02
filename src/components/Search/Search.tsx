import React, { useState, useReducer, useEffect, SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'

import './Search.scss'
import { getSearchOptions } from '../../assets/api-calls'

const initialState = {
	skills: [],
	values: [],
}

function reducer(state:object, update:{type:string, change:any}) {
	return {
		...state,
		[update.type]: update.change
	}	
}

const Search: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [error, setError] = useState('')
	const [query, setQuery] = useState({skills: [], values: []})

	useEffect(() => {
		updateSearchOptions()
	}, [])

	const updateSearchOptions = () => {
		getSearchOptions()
			.then(data => {
				let options = data.data[0]
				Object.keys(options).forEach(option => {
					const checkboxes = options[option].map((attribute: object) => {
						const checkbox = Object.assign(attribute)
						checkbox.checked = false
						return checkbox
					})
					dispatch({ type: option, change: checkboxes })
				})
			})
			.catch(error => setError('Something went wrong!'))
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
				<>
				<button 
					className={option.checked ? 'attribute-tag highlight' : 'attribute-tag'}
					key={`${type}-option-${i}`}
					onClick={async (event) => {
						event.preventDefault()
						updateSelections(event, type, option.attribute)
						makeQuery()
					}}
				>
					{option.attribute}
				</button>
				{(i !== 0 && i % Math.floor(options.length / 8) === 0) &&
					<br />}
				</>
			)
		})
	}

	const makeQuery = () => {
		setQuery({
			skills: state.skills.filter((skill:any) => skill.checked),
			values: state.values.filter((value:any) => value.checked)
		})
	}
	
	const checkQuery = () => {
		if (query.skills.length === 0 && query.values.length === 0) {
			setError('Please select at least one search option and try again.')
		} else {
			setError('')
		}
	}

	return (
		<form 
			className="Search" 
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
			<div>
				<Link
					to={{
						pathname: "/search-results",
						state: { query: query }
					}}
					className="cta-button" 
					onClick={() => {
						checkQuery()
					}}
				>
					Search
				</Link>
				<button
					className="cta-button"
					onClick={(event) => {
						event.preventDefault()
						updateSearchOptions()
						setQuery({skills: [], values: []})
					}}
				>
					Clear
				</button>
			</div>
			{error !== "" && <h3 className="search-error">{error}</h3>}
		</form>
	)
}

export default Search