import React from 'react'
import { Link } from 'react-router-dom'

import './Home.scss'
import { OpenMenuContext } from '../../contexts/index'

const Home: React.FC = () => {
	return (
		<main>
			<section className="about">
				<img src='../images/clipboard.png' alt="clipboard"/>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus viverra adipiscing at in tellus integer. Tristique sollicitudin nibh sit amet. Habitant morbi tristique senectus et netus et malesuada fames ac. Ornare aenean euismod elementum nisi. Rhoncus aenean vel elit scelerisque mauris.</p>
			</section>
			<nav className="cta-buttons">
				<OpenMenuContext.Consumer>
					{({isOpen, setIsHidden, toggleMenu }) => (
						<>
							<button className="cta-button" onClick={() => {
									if(isOpen) {
										toggleMenu()
									} else {
										setIsHidden(false)
										toggleMenu()
									}
							}}>Find Applicants</button>
							<Link 
								to="/" 
								onClick={() => {
									if (isOpen) {
										toggleMenu()
										setTimeout(() => {
											setIsHidden(true)
										}, 500)
									}
								}}
							>
								I'm an Applicant
							</Link>
						</>	
					)}
				</OpenMenuContext.Consumer>
			</nav>
		</main>
	)
}

export default Home