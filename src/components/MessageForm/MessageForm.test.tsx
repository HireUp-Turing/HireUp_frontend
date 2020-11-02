import React from "react";
import { render, screen, fireEvent, findByText, waitFor} from "@testing-library/react";
import MessageForm from "./MessageForm";
// import { mocked } from 'ts-jest/utils';
import { shallow } from 'enzyme';
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

  it('Send should fire an event', async () => {
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

    const sendButton = screen.getByPlaceholderText("send", {exact:false})
    // const sendButton = screen.getByRole("button", {name:"send", exact: false})
    // const sendButton = await screen.getByRole("button", {name:"send", exact: false})
    expect(sendButton).toBeInTheDocument()
    // const mockFn= jest.fn()
    sendButton.simulate('click')
    fireEvent.click(sendButton)
    // expect(mockFn)toHaveBeenCalled()
    await expect(sendButton).toBeCalledTimes(1)
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
    
    // expect(messageInput).toBeInTheDocument()
    // expect(emailInput).toBeInTheDocument()
    // expect(nameInput).toBeInTheDocument()
  
    expect(sendButton).toBeInTheDocument()
    expect(nameInput.value).toBe('')
    expect(emailInput.value).toBe('')
    expect(messageInput.value).toBe('')

    fireEvent.change(emailInput, {target: {name: 'email', value: 'New-Title'}})
    await expect(emailInput.value).toEqual('New-Title')

    fireEvent.change(nameInput, {target: {name: 'name', value: 'New-Title'}})
    await expect(emailInput.value).toEqual('New-Title')

    fireEvent.change(messageInput, {target: {name: 'message', value: 'New-Title'}})
    await expect(emailInput.value).toEqual('New-Title')

  
  

  })
})