import React from "react";
import { render, screen, fireEvent, findByText, waitFor} from "@testing-library/react";
import Inbox from "./Inbox";
import { mocked } from 'ts-jest/utils';
import { getMessages } from '../../assets/api-calls'
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from '../../contexts/index'

jest.mock('../../assets/api-calls')

describe('Inbox', () => {
  it('should render messages', async () => {
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
        params: {id: 1},
        path: "",
        url: ""}
}
    const auth = 1;
    mocked(getMessages).mockImplementation(() => 
      Promise.resolve(mockedMessages))

      const { findByText, findAllByText } = render(<MemoryRouter><AuthContext.Provider value={{auth}}><Inbox {...routeComponentPropsMock} /></AuthContext.Provider></MemoryRouter>)
      const turing = await findAllByText(/turing/i)
      const body = await findByText(/i want to interview you!/i)
      const date = await findByText("November 02, 2020", {exact: false})

      expect(turing.length).toBe(2)
      expect(body).toBeInTheDocument()
      expect(date).toBeInTheDocument()
    })
})