import React from 'react'
import { Link } from 'react-router-dom'

import './Home.scss'
import { OpenMenuContext } from '../../contexts/index'

const Home: React.FC = () => {
	return (
		<main className="Home">
			<section className="about">
				<img src='../images/clipboard.png' alt="clipboard"/>
				<p>HireUp aims to minimize bias in the hiring process by turning applications into true Classifieds! 
				Our anonomyzed job applicants are the best in the buis. By eliminating paperwork (CVs, resumes, etc) we've boiled down
				the application process to the things you care about - skills and values. <br />

				If you're looking for new staff go ahead and start searching our profiles! You'll be able to directly message applicants through our site.
				If you're an applicant, start out by submitting a profile with us below! </p>
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