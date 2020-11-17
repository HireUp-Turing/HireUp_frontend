import React from 'react'
import SearchResults from './SearchResults'
import { render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { MemoryRouter } from 'react-router-dom'
import { search } from '../../assets/api-calls'
jest.mock('../../assets/api-calls')

describe('SearchResults', () => {

  it('Should render applicants on the page', async () => {
    const mockedSearch =
     [
        {
					id: 1,
					username: "Finn",
					bio: "I'm a grey kitty and need a job",
					skills: [{ attribute: "rails" }, { attribute: "ruby" }],
					values: [{ attribute: "creativity" }]
        },
        {
					id: 2,
					username: "Howard",
					bio: "I need to start contributing to this household",
					skills: [{ attribute: "javascript" }, { attribute: "ruby" }],
					values: [{ attribute: "creativity" }]
        }
      ]

    mocked(search).mockImplementation(() =>
			Promise.resolve(mockedSearch)
		)
    
    const query = { 
      query: {
        skills: [
          {
            attribute: "rails",
            checked: true,
            id: 37
          }
        ],
        values: [
          {
            attribute: "creativity",
            checked: true,
            id: 21
          }
        ]
      }
    }


		const routeComponentPropsMock = {
			history: {} as any,
			location: {
				state: query as any,
				pathname: "",
				search: "",
				hash: ""
			},
			match: {
				isExact: true,
				params: { id: 1 },
				path: "",
				url: ""
			}
		}

		const { findByText } = render(
			<MemoryRouter>
				<SearchResults 
					{...routeComponentPropsMock}
				/>
			</MemoryRouter>
    )

		const applicant1 = await findByText(/finn/i)
		const applicant2 = await findByText(/howard/i)

		expect(applicant1).toBeInTheDocument()
		expect(applicant2).toBeInTheDocument()
	})

})