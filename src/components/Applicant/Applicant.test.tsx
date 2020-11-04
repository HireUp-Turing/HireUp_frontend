import React from "react"
import Applicant from "./Applicant"
import { render, screen } from "@testing-library/react"
import { mocked } from 'ts-jest/utils'
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom"
import { getApplicantById } from '../../assets/api-calls'
jest.mock('../../assets/api-calls')

describe('Applicant', () => {

  it('Should render an applicant', async () => {
    const mockedApplicant = {
      "success": true,
      "data": {
        "id": 1,
        "username": "Anonymous Giraffe",
        "email": "gaby@hireup.com",
        "bio": "Noodle's mom!",
        "skills": [
          "rails",
          "ruby"
        ],
        "values": [
          "creativity"
        ]
      }
    }
    mocked(getApplicantById).mockImplementation(() => 
      Promise.resolve(mockedApplicant))

		const routeComponentPropsMock = {
			history: {} as any,
			location: {} as any,
			match: {
				isExact: true,
				params: { id: 1 },
				path: "",
				url: ""
			}
		}

		render(<MemoryRouter><Applicant {...routeComponentPropsMock}/></MemoryRouter>)
      
		const name = await screen.findByText(/Anonymous Giraffe/i)
		const bio = await screen.findByText(/Noodle's mom!/i)
		const skill1 = await screen.findByText(/ruby/i)
		const value1 = await screen.findByText(/creativity/i)
		
		expect(bio).toBeInTheDocument()
		expect(name).toBeInTheDocument()
		expect(skill1).toBeInTheDocument()
		expect(value1).toBeInTheDocument()
	})

})