import React from "react"
import MessageForm from "./MessageForm"
import { render, screen, fireEvent, act, findByText, findByDisplayValue} from "@testing-library/react"
import { mocked } from 'ts-jest/utils'
import { MemoryRouter } from "react-router-dom"
import { MessageFormContext } from '../../contexts/index'
import { sendMessage } from '../../assets/api-calls'
jest.mock('../../assets/api-calls')

describe('MessageForm', () => {

  it('Should render a form', async () => {
		const messageForm = true
		const showMessageForm = jest.fn()
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

    render(
			<MemoryRouter>
				<MessageFormContext.Provider value={{ messageForm, showMessageForm }}>
					<MessageForm {...routeComponentPropsMock} />
				</MessageFormContext.Provider>
			</MemoryRouter>
		)

    const nameInput = screen.getByLabelText("Your name", {exact: false})
    const emailInput = screen.getByLabelText("The best email to reach you", {exact: false})
    const messageInput = screen.getByLabelText("Your message here", {exact: false})
    const sendButton = screen.getByPlaceholderText("Send", {exact:false})

    expect(sendButton).toBeInTheDocument()
    expect(messageInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
  })

  it.skip('Should fire the correct method when send button clicked', async () => {
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
    
		const messageForm = true
		const showMessageForm = jest.fn()
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

		render(
			<MemoryRouter>
				<MessageFormContext.Provider value={{ messageForm, showMessageForm }}>
					<MessageForm {...routeComponentPropsMock} />
				</MessageFormContext.Provider>
			</MemoryRouter>
		)

    const employerName = await screen.findByLabelText(/name/i)
    const employerEmail = await screen.findByLabelText(/email/i)
    const message = await screen.findByLabelText(/message/i)
      
    fireEvent.change(employerName, { target: { value: /google/i } })
    fireEvent.change(employerEmail, { target: { value: /google@gmail.com/i } })
    fireEvent.change(message, { target: { value: /please work for us!/i} })

    const sendButton = await screen.findByRole("button", { name: /send/i })
    fireEvent.click(sendButton)
    expect(sendMessage).toBeCalledTimes(1)
  })

  it('Should reflect a change in input', async () => {
		const messageForm = true
		const showMessageForm = jest.fn()
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

		const { findByDisplayValue } = render(
			<MemoryRouter>
				<MessageFormContext.Provider value={{ messageForm, showMessageForm }}>
					<MessageForm {...routeComponentPropsMock} />
				</MessageFormContext.Provider>
			</MemoryRouter>
		)

    const sendButton = screen.getByPlaceholderText("Send", {exact:false})
    const nameInput = screen.getByLabelText("Your name", {exact: false})
    const emailInput = screen.getByLabelText("The best email to reach you", {exact: false})
    const messageInput = screen.getByLabelText("Your message here", {exact: false})
  
    expect(sendButton).toBeInTheDocument()

    fireEvent.change(nameInput, {target: { value: 'google' }})
    fireEvent.change(emailInput, {target: { value: 'email@gmail.com' }})
		fireEvent.change(messageInput, {target: { value: 'we want you to work for us!' }})
		
		const name = await findByDisplayValue(/google/i)
		const email = await findByDisplayValue(/email@gmail.com/i)
		const message = await findByDisplayValue(/we want you to work for us!/i)
		expect(name).toBeInTheDocument()
		expect(email).toBeInTheDocument()
		expect(message).toBeInTheDocument()
	})
	
})