import React, { useState, useEffect } from 'react'
import { skillsData, valuesData } from '../../assets/test-values-skills'
import { Link } from 'react-router-dom'

import './Search.scss'

// type Radio<T> = T extends Element 

const Search: React.FC = () => {
	const [values, setValues] = useState<Array<string>>([])
	const [skills, setSkills] = useState<Array<string>>([])

	const setOption = (event: {target: HTMLInputElement}) => {
		const type = event.target.id.split('-')[0]
		const attribute = event.target.value
		const state = type === 'skill' ? skills : values
		if (state.includes(attribute)) {
			const index = state.indexOf(attribute)
			console.log(index)
			state.splice(index, 1)
		} else {
			state.push(attribute)	
		}
		type === 'skill' ? setSkills(state) : setValues(state)
	}

	const checkIfSelected = (attribute:string, type:string): boolean => {
		const state = type === 'skill' ? skills : values 
		return state.includes(attribute)
	}

	const makeOptions = (options:Array<string>, type:string) => {
		return options.map((attribute: any, i) => {
			const isChecked: boolean = checkIfSelected(attribute, type)
			return (
				<div className="option" key={`${type}-option-${i}`}>
					<input 
						id={`${type}-option-${i}`} 
						type="radio" 
						value={attribute} 
						onChange={setOption}
						checked={isChecked}				
					/>
					<label htmlFor={`option-${i}`}>{attribute}</label>
				</div>
			)
		})
	}

	return (
		<section className="Search">
			<h2>Find Applicants</h2>
			<label htmlFor="skills-options" className="form-label">
				What skills are you hiring for?
			</label>
			<section id="skills-options" className="options">
				{makeOptions(skillsData, "skill")}
			</section>
			<label htmlFor="values-options" className="form-label">
				What does your company value?
			</label>
			<section id="values-options" className="options">
				{makeOptions(valuesData, "value")}
			</section>
			<Link to="/" className="cta-button">Search</Link>
		</section>
	)
}

export default Search