import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import { OpenMenuContext } from '../../contexts/index'
import './Header.scss'

const Header: React.FC = () => {
	return (
		<header className="Header">
			<h1><Link to="/">
				HIRE UP
			</Link></h1>
			<OpenMenuContext.Consumer>
				{({ isOpen, toggleMenu }) => (
					<nav className="header-nav">
				<NavLink exact to="/applicant/:id">MY PROFILE</NavLink>
				<NavLink exact to="/applicant/:id/inbox">INBOX</NavLink>
				<button onClick={() => {
					toggleMenu()
					console.log(isOpen)
				}
				}>ok</button>
			</nav>
				)}
			</OpenMenuContext.Consumer>
		</header>
	)
}

export default Header