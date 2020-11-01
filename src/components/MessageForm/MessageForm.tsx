import React, { useState, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { EmployerMessage } from '../../assets/definitions'
import { sendMessage } from '../../assets/api-calls'
import './MessageForm.scss'
import { MessageFormContext } from '../../contexts'

const MessageForm: React.FC<RouteComponentProps> = (props) => {
  const [message, setMessage] = useState<EmployerMessage>({employer_name: '', employer_email: '', body: ''})
  const [error, setError] = useState('')
  const [alert, setAlert] = useState('')

  const handleMessageChange = (event:ChangeEvent<HTMLTextAreaElement> ) => {
    setMessage({...message, [event.target.id]: event.target.value})
    setError('')
  }

  const postMessage = (showMessageForm: (value: boolean) => void) => {
    if (Object.keys(message).every((property:string) => {
      return message[property as keyof EmployerMessage] !== ''
      })) {
      const params:any = props.match.params
      sendMessage(params.id, message).then(response => {
        if (response.ok) {
        setAlert('Success! Your message was sent!')
        window.setTimeout(() => {
          showMessageForm(false)
        }, 3000)
        } else {
          setError('Something went wrong, please try again!')
          window.setTimeout(() => {
            setError('')
          }, 2000)
        }
      })
    } else {
      setError('Please fill out every field above before sending')
    }
  }
  if (!alert) {
    return (
      <MessageFormContext.Consumer>
      {({ showMessageForm }) => (
        <form className="MessageForm" onSubmit={(event) => {
          event.preventDefault()
          postMessage(showMessageForm)
        }}>
          <label htmlFor="employer_name">Your name:</label>
          <textarea id="employer_name" className="applicant-input" onChange={handleMessageChange}/>
          <label htmlFor="employer_email">The best email to reach you at:</label>
          <textarea id="employer_email" className="applicant-input" onChange={handleMessageChange}/>
          <label htmlFor="body">Your message here:</label>
          <textarea id="body" className="applicant-input" rows={3} onChange={handleMessageChange}/>
          <input type="submit" value="Send" className="cta-button"/>
          <h3>{error}</h3>
        </form>
      )} 
      </MessageFormContext.Consumer>
    )
  } else {
    return (
      <h3>{alert}</h3>
    )
  }
}

export default MessageForm
