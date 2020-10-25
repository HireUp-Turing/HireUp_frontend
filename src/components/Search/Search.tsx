import React, { useState, useEffect } from 'react'
import { skills, values } from '../../assets/test-values-skills'
import { Link } from 'react-router-dom'

import './Search.scss'

const Search: React.FC = () => {

	const makeOptions = (options:Array<string>, type:String) => {
		return options.map((attribute, i) => (
			<div className="option" key={`${type}-option-${i}`}>
				<input id={`${type}-option-${i}`} type="radio" value={attribute} />
				<label htmlFor={`option-${i}`}>{attribute}</label>
			</div>
		))
	}

	return (
		<section className="Search">
			<h2>Find Applicants</h2>
			<label htmlFor="skills-options" className="form-label">
				What skills are you hiring for?
			</label>
			<section id="skills-options" className="options">
				{makeOptions(skills, "skill")}
			</section>
			<label htmlFor="values-options" className="form-label">
				What does your company value?
			</label>
			<section id="values-options" className="options">
				{makeOptions(values, "value")}
			</section>
			<Link to="/" className="cta-button">Search</Link>
		</section>
	)
}

export default Search