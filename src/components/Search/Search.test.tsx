import React from 'react'
import Search from './Search'
import { render, fireEvent } from '@testing-library/react'
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
		const value1 = await findByText(/creativity/i)
		const value2 = await findByText(/mentorship/i)
		expect(skill1).toBeInTheDocument()
		expect(skill2).toBeInTheDocument()
		expect(skill3).toBeInTheDocument()
		expect(value1).toBeInTheDocument()
		expect(value2).toBeInTheDocument()
	})

	// it('Should fire the correct method when search button clicked', () => {
	// 	render(<MemoryRouter><Search /></MemoryRouter>)
	// 	const searchButton = screen.getByRole('link', { name: /search/i })
	// 	fireEvent.click(searchButton)
	// 	// see that getSearchOptions (the async) was called 1 time
	// })

	it('Should show error message if no options are selected upon search', async () => {
		mocked(getSearchOptions).mockImplementation(() =>
			Promise.resolve(mockedSearchOptions)
		)
		const { findByRole, findByText } = render(<MemoryRouter><Search /></MemoryRouter>)
		const searchButton = await findByRole('link', { name: /search/i })
		
		// with no options selected
		fireEvent.click(searchButton)
		const error = await findByText(/please select at least one search option/i)
		expect(error).toBeInTheDocument()
		
		// after selecting an option
		const skill1 = await findByText(/flask/i)
		fireEvent.click(skill1)
		fireEvent.click(searchButton)
		expect(error).not.toBeInTheDocument()
	})

	it('Should clear selected options when clear button clicked', async () => {
		mocked(getSearchOptions).mockImplementation(() =>
			Promise.resolve(mockedSearchOptions)
		)
		const { findByRole, findByText, queryByText } = render(<MemoryRouter><Search /></MemoryRouter>)
		
		// select an option and search button will not throw error
		const skill1 = await findByText(/flask/i)
		const searchButton = await findByRole('link', { name: /search/i })
		fireEvent.click(skill1)
		fireEvent.click(searchButton)
		const error = await queryByText(/please select at least one search option/i)
		expect(error).not.toBeInTheDocument()
		
		// clear options and run search, error message will show
		const clearButton = await findByRole('button', { name: /clear/i })
		fireEvent.click(clearButton)
		fireEvent.click(searchButton)
		expect(await findByText(/please select at least one search option/i)).toBeInTheDocument()
	})

})