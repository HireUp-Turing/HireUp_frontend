import React from 'react'
import ApplicantPreview from './ApplicantPreview'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('ApplicantPreview Component', () => {

	it('Should display a codename and bio', () => {
		render(
			<MemoryRouter>
				<ApplicantPreview
					id={1}
					username="busy bee"
					bio="I like to code!"
					skills={[{attribute: "ruby", id: 1}]}
					values={[{attribute: "teamwork", id: 1}]}
					query={{query: {
						skills: [{attribute: "ruby", checked: true}],
						values: [{attribute: "teamwork", checked: true}]
					}}}
				/>
			</MemoryRouter>
		)
		const username = screen.getByRole('heading', { name: /busy bee/i })
		const bio = screen.getByText(/i like to code!/i)
		expect(username).toBeInTheDocument()
		expect(bio).toBeInTheDocument()
	})

	it('Should display an avatar', () => {
		render(
			<MemoryRouter>
				<ApplicantPreview
					id={1}
					username="busy bee"
					bio="I like to code!"
					skills={[{attribute: "ruby", id: 1}]}
					values={[{attribute: "teamwork", id: 1}]}
					query={{query: {
						skills: [{attribute: "ruby", checked: true}],
						values: [{attribute: "teamwork", checked: true}]
					}}}
				/>
			</MemoryRouter>
		)
		const avatar = screen.getByAltText(/busy bee\'s icon/i)
		expect(avatar).toBeInTheDocument()
	})

})