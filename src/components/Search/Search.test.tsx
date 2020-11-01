import React from 'react'
import Search from './Search'
import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { MemoryRouter } from 'react-router-dom'
import { getSearchOptions } from '../../assets/api-calls'
jest.mock('../../assets/api-calls')

describe('Search Component', () => {
	let mockedSearchOptions: { success: boolean, data: Array<any> }

	beforeEach(() => {
		mockedSearchOptions = {
			"success": true,
			"data": [
				{
					"skills": [
						{
							"id": 2,
							"attribute": "flask"
						},
						{
							"id": 1,
							"attribute": "rails"
						},
						{
							"id": 3,
							"attribute": "ruby"
						}
					],
					"values": [
						{
							"id": 1,
							"attribute": "creativity"
						},
						{
							"id": 2,
							"attribute": "mentorship"
						}
					]
				}
			]
		}
	})

	it('Should display a title and two prompts', async () => {
		mocked(getSearchOptions).mockImplementation(() =>
			Promise.resolve(mockedSearchOptions)
		)
		const { findByRole, findByText } = render(<MemoryRouter><Search /></MemoryRouter>)
		const title = await findByRole('heading', { name: /find applicants/i })
		const prompt1 = await findByText(/skills/i)
		const prompt2 = await findByText(/values/i)
		expect(title).toBeInTheDocument()
		expect(prompt1).toBeInTheDocument()
		expect(prompt2).toBeInTheDocument()
	})

	it('Should display two buttons', async () => {
		mocked(getSearchOptions).mockImplementation(() =>
			Promise.resolve(mockedSearchOptions)
		)
		const { findByRole } = render(<MemoryRouter><Search /></MemoryRouter>)
		const searchButton = await findByRole('link', { name: /search/i })
		const clearButton = await findByRole('button', { name: /clear/i })
		expect(searchButton).toBeInTheDocument()
		expect(clearButton).toBeInTheDocument()
	})

	it('Should fetch search options upon load', async () => {
		mocked(getSearchOptions).mockImplementation(() =>
			Promise.resolve(mockedSearchOptions)
		)
		const { findByText } = render(<MemoryRouter><Search /></MemoryRouter>)
		const skill1 = await findByText(/flask/i)
		const skill2 = await findByText(/rails/i)
		const skill3 = await findByText(/ruby/i)
		expect(skill1).toBeInTheDocument()
		expect(skill2).toBeInTheDocument()
		expect(skill3).toBeInTheDocument()
	})

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