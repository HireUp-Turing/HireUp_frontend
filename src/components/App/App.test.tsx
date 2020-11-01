import React from 'react'
import App from './App'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

it('Should render a header with title and search icon', () => {
	render(<MemoryRouter><App /></MemoryRouter>)
	const title = screen.getByRole('link', { name: /hire up/i })
	const searchIcon = screen.getByAltText(/search icon/i)
	expect(title).toBeInTheDocument()
	expect(searchIcon).toBeInTheDocument()
})
