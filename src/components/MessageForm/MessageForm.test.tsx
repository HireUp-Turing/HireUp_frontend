import React from "react";
import { render, screen, fireEvent, findByText, waitFor} from "@testing-library/react";
import MessageForm from "./MessageForm";
// import { mocked } from 'ts-jest/utils';
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from '../../contexts/index'

jest.mock('../../assets/api-calls')

describe('MessageForm', () => {
  it('should render a form', async () => {
    const routeComponentPropsMock = {
      history: {} as any,
      location: {} as any,
      match: {
        isExact: true,
        params: {id: 1},
        path: "",
        url: ""
      }
    }
    const auth = 1
    render(<MemoryRouter><AuthContext.Provider value={{auth}}><MessageForm {...routeComponentPropsMock} /></AuthContext.Provider></MemoryRouter>)
    const nameInput = screen.getByLabelText("Your name", {exact: false})
    const emailInput = screen.getByLabelText("The best email to reach you", {exact: false})
    const messageInput = screen.getByLabelText("Your message here", {exact: false})
    const sendButton = screen.getByPlaceholderText("Send", {exact:false})

    expect(sendButton).toBeInTheDocument()
    expect(messageInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
  })
})