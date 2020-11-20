import React from 'react'
import { Link } from 'react-router-dom'

import { OpenMenuContext } from '../../contexts/index'
import './Home.scss'

const Home: React.FC = () => {
	return (
		<main className="Home">
			<section className="about">
				<img src='../images/people.png' className="hirees" alt="clipboard"/>
				<p>HireUp aims to minimize bias in the hiring process by turning resumes into true classifieds. By eliminating paperwork and identifying information, we've boiled down the application process to the things you care about most — skills and values.</p>
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
								to="/create-applicant" 
								onClick={() => {
									if (isOpen) {
										toggleMenu()
										setTimeout(() => {
											setIsHidden(true)
										}, 500)
									} else {
										setIsHidden(true)
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