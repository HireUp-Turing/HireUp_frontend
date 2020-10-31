import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { getMessages } from '../../assets/api-calls'
import './Inbox.scss'

interface Messages {
  applicant_id: number
  body: string
  created_at: string
  employer_email: string
  employer_name: string
  id: number
  read_status: boolean
}

const Inbox: React.FC<RouteComponentProps> = (props) => {
  const [messages, setMessages] = useState<Array<Messages>>([])

  useEffect(() => {
    const match:any = props.match.params
    getMessages(match.id).then(response => {
      setMessages(response.data)
      console.log(response.data)
    })
  }, [props.match.params])

// if read status is false, message is highlighted
//if read status is true unhighlight

  const displayMessages = () => {
    return messages.map((message, i) => {
      return (
        <div className="message-info">
          <h3>From: {message.employer_name}</h3>
          <h3>{message.employer_email}</h3>
          <h3>{message.body}</h3>
          <h5>{message.read_status}</h5>
          <h5>{message.created_at}</h5>
        </div>
      )
    })
  }

  return (
    <div className="message-container">{displayMessages()}</div>

  )
}

export default Inbox
