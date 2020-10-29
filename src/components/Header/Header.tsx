import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'

import Search from '../Search/Search'
import { OpenMenuContext } from '../../contexts/index'
import './Header.scss'

const Header: React.FC = () => {
	return (
		<header className="Header">
			<OpenMenuContext.Consumer>
				{({ isOpen, stateChangeHandler }) => (
					<Menu
						customBurgerIcon={<img src="../search.svg" alt="search icon" />}
						customCrossIcon={<img src="../close.svg" alt="close icon" />}
						width="min-content"
						isOpen={isOpen}
						onStateChange={(state) => stateChangeHandler(state)}
					>
						<Search />
					</Menu>
				)}
			</OpenMenuContext.Consumer>
			<h1><Link to="/">
				HIRE UP
			</Link></h1>
			<nav className="header-nav">
				<NavLink exact to="/applicant/:id">MY PROFILE</NavLink>
				<NavLink exact to="/applicant/:id/inbox">INBOX</NavLink>
			</nav>
		</header>
	)
}

export default Header