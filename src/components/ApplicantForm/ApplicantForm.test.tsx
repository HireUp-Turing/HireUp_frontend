import React from "react"
import ApplicantForm from "./ApplicantForm"
import { render, screen } from "@testing-library/react"
import { mocked } from 'ts-jest/utils'
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom"
import { getAttributes } from '../../assets/api-calls'
jest.mock('../../assets/api-calls')

describe('ApplicantForm', () => {

	it('Should render a form', async () => {
		const mockedAttributes = {
			"success": true,
			"data": [
				{
					"id": 1,
					"attribute": "rails"
				},
				{
					"id": 3,
					"attribute": "ruby"
				},
				{
					"id": 29,
					"attribute": "leadership"
				},
				{
					"id": 30,
					"attribute": "organization"
				}
			]
		}

    mocked(getAttributes).mockImplementation(() => 
    Promise.resolve(mockedAttributes))

    render(<MemoryRouter><ApplicantForm /></MemoryRouter>)

		const lastNameInput = screen.getByLabelText("First Name", {exact: false})
		const firstNameInput = screen.getByLabelText("Last Name", {exact: false})
		const emailInput = screen.getByLabelText("email", {exact: false})
		const bioInput = screen.getByLabelText("bio", {exact: false})
		const createButton = screen.getByRole("button", { name: "create your profile", exact:false})
		const skill2 = await screen.findAllByText(/rails/i)
		const skill1 = await screen.findAllByText(/ruby/i)
		const value1 = await screen.findAllByText(/leadership/i)
		const value2 = await screen.findAllByText(/organization/i)
		
		expect(lastNameInput).toBeInTheDocument()
		expect(firstNameInput).toBeInTheDocument()
		expect(emailInput).toBeInTheDocument()
		expect(bioInput).toBeInTheDocument()
		expect(createButton).toBeInTheDocument()
		expect(skill2.length).toBe(2)
		expect(skill1.length).toBe(2)
		expect(value1.length).toBe(2)
		expect(value2.length).toBe(2)
	})

})