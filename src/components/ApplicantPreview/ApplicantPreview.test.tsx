import React from 'react'
import ApplicantPreview from './ApplicantPreview'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('ApplicantPreview Component', () => {

	it('Should display a codename and bio', async () => {
		const { findByRole, findByText } = render(
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
		const username = await findByRole('heading', { name: /busy bee/i })
		const bio = await findByText(/i like to code!/i)
		expect(username).toBeInTheDocument()
		expect(bio).toBeInTheDocument()
	})
})