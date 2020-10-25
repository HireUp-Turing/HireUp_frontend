import React, { useState, useEffect } from 'react'
import { skills, values } from '../../assets/test-values-skills'
import { Link } from 'react-router-dom'

import './Search.scss'

const Search: React.FC = () => {

	const makeOptions = (options:Array<string>) => {
		return options.map((attribute, i) => (
			<div className="option">
				<input id={`option-${i}`} type="radio" value={attribute} />
				<label htmlFor={`option-${i}`}>{attribute}</label>
			</div>
		))
	}

	return (
		<section>
			<section className="options">
				{makeOptions(skills)}
			</section>
			<section className="options">
				{makeOptions(values)}
			</section>
			<Link to="/" className="cta-button">Search</Link>
		</section>
	)
}

export default Search