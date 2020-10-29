import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import { OpenMenuContext } from '../../contexts/index'
import './Header.scss'

const Header: React.FC = () => {
	return (
		<OpenMenuContext.Consumer>
			{({ isOpen, toggleMenu }) => (
				<header 
					className="Header"
					onClick={() => {
						if (isOpen) toggleMenu()
					}}
				>
					<h1>
						<Link to="/"> 
							HIRE UP
						</Link>
					</h1>
					<nav className="header-nav">
						<NavLink exact to="/applicant/:id">MY PROFILE</NavLink>
						<NavLink exact to="/applicant/:id/inbox">INBOX</NavLink>
						<img 
							src="/search.svg" 
							alt="search-icon" 
							className="search-icon"
							title="search" 
							onClick={() => {
								toggleMenu()
							}
						}/>
					</nav>
				</header>
			)}
		</OpenMenuContext.Consumer>
	)
}

export default Header