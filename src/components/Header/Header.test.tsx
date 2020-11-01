import React from 'react'
import Header from './Header'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { OpenMenuContext } from '../../contexts/index'

describe('Header Component', () => {

	it('Should display a title', () => {
		render(<MemoryRouter><Header auth={undefined}/></MemoryRouter>)
		const title = screen.getByRole('heading', { name: /hire up/i })
		expect(title).toBeInTheDocument()
	})

	it('Should display a search icon', () => {
		render(<MemoryRouter><Header auth={undefined}/></MemoryRouter>)
		const searchIcon = screen.getByAltText(/search icon/i)
		expect(searchIcon).toBeInTheDocument()
	})

	it('Should display navigation links when an applicant', () => {
		render(<MemoryRouter><Header auth={12}/></MemoryRouter>)
		const myProfileLink = screen.getByRole('link', { name: /my profile/i })
		const inboxLink = screen.getByRole('link', { name: /inbox/i })
		expect(myProfileLink).toBeInTheDocument()
		expect(inboxLink).toBeInTheDocument()
	})

	it('Should fire the correct methods when search icon clicked', () => {
		const isOpen = false
		const setIsHidden = jest.fn()
		const toggleMenu = jest.fn()
		render(
			<MemoryRouter>
				<OpenMenuContext.Provider value={{ isOpen, setIsHidden, toggleMenu }}>
					<Header auth={undefined} />
				</OpenMenuContext.Provider>
			</MemoryRouter>
		)
		const searchIcon = screen.getByAltText(/search icon/i)
		fireEvent.click(searchIcon)
		expect(setIsHidden).toBeCalledTimes(1)
		expect(toggleMenu).toBeCalledTimes(1)
	})

})