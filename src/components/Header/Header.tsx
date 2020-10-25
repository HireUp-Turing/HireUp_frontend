import React from 'react'
import { NavLink } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import './Header.scss'

import Search from '../Search/Search'

const Header: React.FC = () => {
	return (
		<header className="Header">
			<Menu
				customBurgerIcon={<img src="../search.svg" alt="search icon" />}
				customCrossIcon={<img src="../close.svg" alt="close icon" />}>
				<Search />
			</Menu>
			<h1>HIRE UP</h1>
			<nav>
				<NavLink exact to="/">MY PROFILE</NavLink>
				<NavLink exact to="/applicant" activeClassName="active">TEST</NavLink>
			</nav>
		</header>
	)
}

export default Header