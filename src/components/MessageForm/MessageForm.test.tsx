import React from "react";
import { render, screen, fireEvent, act} from "@testing-library/react";
import MessageForm from "./MessageForm";
import { mocked } from 'ts-jest/utils';
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import { AuthContext, MessageFormContext } from '../../contexts/index'
import { sendMessage } from '../../assets/api-calls'

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

  it('Send should fire an event', async () => {
    
    let mockedMessage = {
      "success": true,
      "data": {
        "id": 23,
        "applicant_id": 1,
        "employer_name": "1",
        "employer_email": "1",
        "body": "1",
        "read_status": false,
        "created_at": "2020-11-03 20:56:28.204907+00:00",
        "success": true
      }
    }

    mocked(sendMessage).mockImplementation(() =>
    Promise.resolve(mockedMessage)
    )
    
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
    const showMessageForm = jest.fn()
    const messageForm = true

    act(() => {
	  render(<MemoryRouter><MessageFormContext.Provider value={{ messageForm, showMessageForm }}><MessageForm {...routeComponentPropsMock} /></MessageFormContext.Provider></MemoryRouter>)
		  })
    const employerName = await screen.findByLabelText(/name/i)
    const employerEmail = await screen.findByLabelText(/email/i)
    const message = await screen.findByLabelText(/message/i)
      
    fireEvent.change(employerName, { target: { value: /google/i } })
    fireEvent.change(employerEmail, { target: { value: /google@gmail.com/i } })
    fireEvent.change(message, { target: { value: /please work for us!/i} })

    const sendButton = await screen.findByRole("button", { name: /send/i })
    fireEvent.click(sendButton)
    
    expect(sendMessage).toBeCalledTimes(1)
    
    mockedMessage = {
      "success": true,
      "data": {
          "id": 23,
          "applicant_id": 1,
          "employer_name": "1",
          "employer_email": "1",
          "body": "1",
          "read_status": false,
          "created_at": "2020-11-03 20:56:28.204907+00:00",
          "success": true
      }
    } 
  })

  it('input should reflect a change', async () => {
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

    const sendButton = screen.getByPlaceholderText("Send", {exact:false})
    const nameInput = screen.getByLabelText("Your name", {exact: false})
    const emailInput = screen.getByLabelText("The best email to reach you", {exact: false})
    const messageInput = screen.getByLabelText("Your message here", {exact: false})
  
    expect(sendButton).toBeInTheDocument()

    fireEvent.change(emailInput, {target: {name: 'email', value: 'New-Title'}})
    fireEvent.change(nameInput, {target: {name: 'name', value: 'New-Title'}})
    fireEvent.change(messageInput, {target: {name: 'message', value: 'New-Title'}})
  })
})