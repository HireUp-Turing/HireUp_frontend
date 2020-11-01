import React from 'react'
import Home from './Home'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { OpenMenuContext } from '../../contexts/index'

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

	it('Should fire the correct method when Find Applicants is clicked', () => {
		const isOpen = false
		const setIsHidden = jest.fn()
		const toggleMenu = jest.fn()
		render(
			<MemoryRouter>
				<OpenMenuContext.Provider value={{ isOpen, setIsHidden, toggleMenu }}>
					<Home />
				</OpenMenuContext.Provider>
			</MemoryRouter>
		)
		const findApplicantsButton = screen.getByRole('button', { name: /find applicants/i })
		fireEvent.click(findApplicantsButton)
		expect(setIsHidden).toBeCalledTimes(1)
		expect(toggleMenu).toBeCalledTimes(1)
		fireEvent.click(findApplicantsButton)
		expect(toggleMenu).toBeCalledTimes(2)
	})

})