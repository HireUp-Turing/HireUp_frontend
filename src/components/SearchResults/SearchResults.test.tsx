import React from 'react'
import SearchResults from './SearchResults'
import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { MemoryRouter } from 'react-router-dom'
import { getApplicants } from '../../assets/api-calls'
jest.mock('../../assets/api-calls')

describe('SearchResults', () => {

  it('Should render applicants on the page', async () => {
    
     const mockedApplicants = {
      "success": true,
      "data": [
        {
        "id": 1,
        "username": "Anonymous Giraffe",
        "bio": "Noodle's mom!",
        "skills": [
            "rails",
            "ruby"
        ],
        "values": [
            "creativity"
        ]
        },
        {
        "id": 2,
        "username": "Anonymous Giraffe",
        "bio": "Noodle's mom's accountabilabuddy!",
        "skills": [
            "rails",
            "flask"
        ],
        "values": [
            "creativity",
            "mentorship"
        ]
        }
      ]
      }

    mocked(getApplicants).mockImplementation(() =>
    Promise.resolve(mockedApplicants))
    
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
        hash: "",
        key: 'j13899',
        pathname: "/applicant/1",
        search: "",
        state: {query}
      },
      match: {
        isExact: true,
        params: {id: 1},
        path: "",
        url: ""
      }
    }

    render(
    <MemoryRouter>
      <SearchResults 
        {...routeComponentPropsMock}  
        // query={query}
      />
      </MemoryRouter>
    )

      const value = screen.findByText(/rails/i)
      const skill = screen.findByText(/creativity/i)
      const name = screen.findByText(/anonymous giraffe/i)
      const noodle = screen.findAllByText(/noodle/i)

      expect(value).toBeInTheDocument()
      expect(skill).toBeInTheDocument()
      expect(name).toBeInTheDocument()
      expect(noodle.length).toBe(2)
  
    })

})