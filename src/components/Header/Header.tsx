import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Header.scss'

const Header: React.FC = () => {
	return (
		<header className="Header">
			<h1>HIRE UP</h1>
			<nav>
				<NavLink exact to="/">MY PROFILE</NavLink>
				<NavLink exact to="/applicant" activeClassName="active">TEST</NavLink>
			</nav>
		</header>
	)
}

export default Header