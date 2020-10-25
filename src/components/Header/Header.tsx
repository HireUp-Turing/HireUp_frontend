import React from 'react'
import { NavLink } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import './Header.scss'

const Header: React.FC = () => {
	return (
		<header className="Header">
			<Menu customBurgerIcon={<img src="../search.svg"/>}>
				<a id="home" className="menu-item" href="/">Home</a>
				<a id="about" className="menu-item" href="/about">About</a>
				<a id="contact" className="menu-item" href="/contact">Contact</a>
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