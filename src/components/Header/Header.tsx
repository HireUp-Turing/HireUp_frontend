import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import './Header.scss'

import Search from '../Search/Search'

const Header: React.FC = () => {
	return (
		<header className="Header">
			<Menu
				customBurgerIcon={<img src="../search.svg" alt="search icon" />}
				customCrossIcon={<img src="../close.svg" alt="close icon" />}
				width="min-content"
			>
				<Search />
			</Menu>
			<h1><Link to="/">
				HIRE UP
			</Link></h1>
			<nav className="header-nav">
				<NavLink exact to="/">MY PROFILE</NavLink>
				<NavLink exact to="/applicant" activeClassName="active">TEST</NavLink>
			</nav>
		</header>
	)
}


export default Header