import React from "react";
import { render, screen, fireEvent, findByText, waitFor} from "@testing-library/react";
import ApplicantForm from "./ApplicantForm";
import { mocked } from 'ts-jest/utils';
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from '../../contexts/index'
import { getAttributes } from '../../assets/api-calls'

jest.mock('../../assets/api-calls')

describe('ApplicantForm', () => {
  it('should render a form', async () => {

    // mockedAttributes = Need mock here!

    const routeComponentPropsMock =
      history: {} as any,
      location: {} as any,
      match: {
        isExact: true,
        params: {id: 1},
        path: "",
        url: ""
      }
    }

    // mocked(getAttributes).mockImplementation(() => 
    //   Promise.resolve(mockedAttributes))

    const auth = 1
    render(<MemoryRouter><AuthContext.Provider value={{auth}}><ApplicantForm {...routeComponentPropsMock} /></AuthContext.Provider></MemoryRouter>)

    const lastNameInput = screen.getByLabelText("First Name", {exact: false})
    const firstNameInput = screen.getByLabelText("Last Name", {exact: false})
    const emailInput = screen.getByLabelText("The best email to reach you", {exact: false})
    const BioInput = screen.getByLabelText("Your message here", {exact: false})
    const createButton = screen.getByRole("button", { name: "create your profile", exact:false})
    const skill1 = await screen.findByText(/flask/i)
		const skill2 = await screen.findByText(/rails/i)
		const skill3 = await screen.findByText(/ruby/i)
		const value1 = await screen.findByText(/creativity/i)
    const value2 = await screen.findByText(/mentorship/i)
    
    expect(lastNameInput).toBeInTheDocument()
    expect(firstNameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(BioInput).toBeInTheDocument()
    expect(createButton).toBeInTheDocument()
		expect(skill1).toBeInTheDocument()
		expect(skill2).toBeInTheDocument()
		expect(skill3).toBeInTheDocument()
		expect(value1).toBeInTheDocument()
		expect(value2).toBeInTheDocument()
    })
  })