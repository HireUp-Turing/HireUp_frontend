import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'

const Home: React.FC = () => {
	return (
		<main>
			<section className="about">
				<img src='../images/clipboard.png' alt="clipboard"/>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus viverra adipiscing at in tellus integer. Tristique sollicitudin nibh sit amet. Habitant morbi tristique senectus et netus et malesuada fames ac. Ornare aenean euismod elementum nisi. Rhoncus aenean vel elit scelerisque mauris.</p>
			</section>
			<nav className="cta-buttons">
				<Link to="/">Find Applicants</Link>
				<Link to="/">I'm an Applicant</Link>
			</nav>
		</main>
	)
}

export default Home