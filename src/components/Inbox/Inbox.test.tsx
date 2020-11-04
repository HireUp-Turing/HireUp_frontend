import React from "react"
import Inbox from "./Inbox"
import { render } from "@testing-library/react"
import { mocked } from 'ts-jest/utils'
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from '../../contexts/index'
import { getMessages } from '../../assets/api-calls'
jest.mock('../../assets/api-calls')

describe('Inbox', () => {

  it('Should render messages', async () => {
    let mockedMessages = {
      "success": true,
      "data": [
        {
          "applicant_id": 1,
          "body" : "i want to interview you!",
          "created_at": "November 02, 2020",
          "employer_email" : "info@turing.com",
          "employer_name": "Turing",
          "id": 1,
          "read_status": false,
        }
      ]
    }
      
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

		mocked(getMessages).mockImplementation(() =>
			Promise.resolve(mockedMessages))

		const setAuth = jest.fn()
		const auth = 1

		const { findByText, findAllByText } = render(
			<MemoryRouter>
				<AuthContext.Provider value={{ auth , setAuth }}>
					<Inbox {...routeComponentPropsMock} />
				</AuthContext.Provider>
			</MemoryRouter>
		)
		const turing = await findAllByText(/turing/i)
		const body = await findByText(/i want to interview you!/i)
		const date = await findByText(/november 02, 2020/i)

		expect(turing.length).toBe(2)
		expect(body).toBeInTheDocument()
		expect(date).toBeInTheDocument()
	})

})