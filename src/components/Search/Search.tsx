import React, { useState, useReducer } from 'react'
import { skillsData, valuesData } from '../../assets/test-values-skills'
import { Redirect } from 'react-router-dom'

import './Search.scss'

const initialState = {
	skills: skillsData,
	values: valuesData,
	runSearch: false
}

function reducer(state:object, update: {type:string, change:any}) {
	return {
		...state,
		[update.type]: update.change
	}	
}

const Search: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	
	
	const updateSelections = (event: {target: HTMLInputElement}, type:string) => {
		const change:any = state[type]
		const selection = event.target.value
		const markedAttribute = change
			.filter((option:any) => option.attribute === selection)
		const index = state[type].indexOf(markedAttribute[0])
		change[index].checked = change[index].checked ? false : true;
		dispatch({type, change})
	}
	
	const makeOption = (options:Array<object>, type:string) => {
		return options.map((option:any, i) => {
			return (
				<div className="option" key={`${type}-option-${i}`}>
					<input 
						id={`${type}-option-${i}`} 
						type="checkbox" 
						value={option.attribute} 
						onChange={(event) => updateSelections(event, type)}
						checked={option.checked}				
					/>
					<label htmlFor={`option-${i}`}>{option.attribute}</label>
				</div>
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
		<form className="Search" onSubmit={runSearch}>
			<h2>Find Applicants</h2>
			<label htmlFor="skills-options" className="form-label">
				What skills are you hiring for?
			</label>
			<section id="skills-options" className="options">
				{makeOption(state.skills, "skills")}
			</section>
			<label htmlFor="values-options" className="form-label">
				What does your company value?
			</label>
			<section id="values-options" className="options">
				{makeOption(state.values, "values")}
			</section>
			<button className="cta-button" onClick={runSearch}>
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
	)
}

export default Search