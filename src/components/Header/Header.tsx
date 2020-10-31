import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import { OpenMenuContext } from '../../contexts/index'
import './Header.scss'

interface HeaderProps {
	auth: number | undefined
}

const Header: React.FC<HeaderProps> = ({ auth }) => {
	return (
		<OpenMenuContext.Consumer>
			{({ isOpen, setIsHidden, toggleMenu }) => {
				const hideMenu = () => {
					if (isOpen) {
						toggleMenu()
						setTimeout(() => {
							setIsHidden(true)
						}, 500)
					} else {
						setIsHidden(true)
					}
				}
			return (
				<header className="Header">
					<h1>
						<Link to="/" onClick={hideMenu}>
							HIRE UP
						</Link>
					</h1>
					<nav className="header-nav">
						{auth && 
							<>
								<NavLink exact to={`/applicant/${auth}`} onClick={hideMenu}>
									MY PROFILE
								</NavLink>
								<NavLink exact to={`/applicant/${auth}/inbox`} onClick={hideMenu}>
									INBOX
								</NavLink>
							</>
						}
						<img 
							src={`/magnifying-${isOpen ? 'pink' : 'gray'}.svg`}
							alt="search-icon" 
							className="search-icon"
							title="search" 
							onClick={() => {
								setIsHidden(false)
								toggleMenu()
							}}
						/>
					</nav>
				</header>
			)}}
		</OpenMenuContext.Consumer>
	)
}

export default Header