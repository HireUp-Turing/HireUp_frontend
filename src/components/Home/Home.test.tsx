import React from 'react'
import Home from './Home'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('Home Component', () => {

	it('Should display a about me paragraph and image', () => {
		render(<MemoryRouter><Home /></MemoryRouter>)
		const aboutMe = screen.getByText(/lorem ipsum dolor/i)
		const clipboardImage = screen.getByAltText(/clipboard/i)
		expect(aboutMe).toBeInTheDocument()
		expect(clipboardImage).toBeInTheDocument()
	})

	it('Should display two buttons', () => {
		render(<MemoryRouter><Home /></MemoryRouter>)
		const findApplicantsButton = screen.getByRole('button', { name: /find applicants/i })
		const applicantButton = screen.getByRole('link', { name: /i\'m an applicant/i })
		expect(findApplicantsButton).toBeInTheDocument()
		expect(applicantButton).toBeInTheDocument()
	})

})