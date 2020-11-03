import React from "react";
import { render, screen, fireEvent, findByText} from "@testing-library/react";
import Applicant from "./Applicant";
import { mocked } from 'ts-jest/utils';
import { getApplicantById } from '../../assets/api-calls'
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import { AuthContext, MessageFormContext } from '../../contexts/index'

jest.mock('../../assets/api-calls')

describe('Applicant', () => {
  it('should render an applicant', async () => {

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

    const auth = 1

     const routeComponentPropsMock = {
      history: {
        length: 1,
        location: location
      },
      location: {
        hash: "",
        key: 'j13899',
        pathname: "/applicant/1",
        search: "",
        state: {}
        },
      match: {
        isExact: true,
        params: {id: 1},
        path: "",
        url: ""
      }
    }

    const messageForm = false
    render(<MemoryRouter><AuthContext.Provider value={{auth}}><MessageFormContext.Provider value={{ messageForm }}><Applicant {...routeComponentPropsMock}/></MessageFormContext.Provider>/></AuthContext.Provider></MemoryRouter>)
      
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