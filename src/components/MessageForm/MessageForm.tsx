import React, { useState, ChangeEvent } from 'react'

import { EmployerMessage } from '../../assets/definitions'
import './MessageForm.scss'

const MessageForm: React.FC = () => {
  const [message, setMessage] = useState<EmployerMessage>({employer_name: '', employer_email: '', body: ''})
  const [error, setError] = useState('')

  const handleMessageChange = (event:ChangeEvent<HTMLTextAreaElement> ) => {
    setMessage({...message, [event.target.id]: event.target.value})
    setError('')
  }

  const postMessage = () => {
    if (Object.keys(message).every((property:string) => {
      return message[property as keyof EmployerMessage] !== ''
      })) {
      console.log("ok I'll post that")
    } else {
      setError('Please fill out every field above before sending')
    }
  }

  return (
    <form className="MessageForm" onSubmit={(event) => {
      event.preventDefault()
      postMessage()
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
  )
}

export default MessageForm
