import React from 'react'
import Header from './Header'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('Header Component', () => {

	it('Should display a title', () => {
		render(<MemoryRouter><Header /></MemoryRouter>)
		const title = screen.getByRole('heading', { name: /hire up/i })
		expect(title).toBeInTheDocument()
	})

	it('Should display a search icon', () => {
		render(<MemoryRouter><Header /></MemoryRouter>)
		const searchIcon = screen.getByAltText(/search-icon/i)
		expect(searchIcon).toBeInTheDocument()
	})

	// it('Should display navigation links when on applicant view', () => {
	// 	render(<MemoryRouter><Header /></MemoryRouter>)
	// 	const myProfileLink = screen.getByRole('link', { name: /my profile/i })
	// 	const inboxLink = screen.getByRole('link', { name: /inbox/i })
	// 	expect(myProfileLink).toBeInTheDocument()
	// 	expect(inboxLink).toBeInTheDocument()
	// })

})