import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Header.scss'

const Header: React.FC = () => {
	return (
		<header className="Header">
			<h1>Hire Up</h1>
			<nav>
				<NavLink exact to="/">I'm an Applicant</NavLink>
				<NavLink exact to="/applicant" activeClassName="active">test</NavLink>
			</nav>
		</header>
	)
}

export default Header