import React from 'react'
import Search from './Search'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('Search Component', () => {

	it('Should display a title and two prompts', () => {
		render(<MemoryRouter><Search /></MemoryRouter>)
		const title = screen.getByRole('heading', { name: /find applicants/i })
		const prompt1 = screen.getByText(/skills/i)
		const prompt2 = screen.getByText(/values/i)
		expect(title).toBeInTheDocument()
		expect(prompt1).toBeInTheDocument()
		expect(prompt2).toBeInTheDocument()
	})

	it('Should display two buttons', () => {
		render(<MemoryRouter><Search /></MemoryRouter>)
		const searchButton = screen.getByRole('link', { name: /search/i })
		const clearButton = screen.getByRole('button', { name: /clear/i })
		expect(searchButton).toBeInTheDocument()
		expect(clearButton).toBeInTheDocument()
	})

	// it('Should fetch search options upon load', () => {
	// 	render(<MemoryRouter><Search /></MemoryRouter>)
	// })

	// it('Should fire the correct method when search button clicked', () => {
	// 	render(<MemoryRouter><Search /></MemoryRouter>)
	// 	const searchButton = screen.getByRole('link', { name: /search/i })
	// 	fireEvent.click(searchButton)
	// 	// see that getSearchOptions (the async) was called 1 time
	// })

	// it('Should clear the form when clear button clicked', () => {
	// 	render(<MemoryRouter><Search /></MemoryRouter>)
	// 	const clearButton = screen.getByRole('button', { name: /clear/i })
	// 	// need to render some fake options
	// 	// find one of them (getByText???)
	// 	// click it
	// 	// see that state updated with it?
	// 	// when clear button clicked, see that state is empty?
	// 	const option1 = screen.getByRole('button', { name: /buttonname/i})
	// 	fireEvent.click(option1)
	// 	fireEvent.click(clearButton)
	// 	expect(clearButton).toBeInTheDocument()
	// })

})