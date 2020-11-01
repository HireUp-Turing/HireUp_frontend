import React, { useEffect, useState, SyntheticEvent } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'

import { getMessages } from '../../assets/api-calls'
import { AuthContext } from '../../contexts'
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

  const displayMessages = () => {
    const inbox = messages.map((message, i) => {
      return (
        <div className={message.read_status ? "read" : "message-info"}
          onClick={(event) => {
            markRead(event, message.id)
          }}>
          <h2>From: {message.employer_name}</h2>
          <h3>{message.employer_email}</h3>
          <h3>{message.body}</h3>
          <h5>{message.created_at.substring(0, 11)}</h5>
        </div>
      )
    })
    return inbox.length > 0 ? inbox : <h3>You don't have any messages yet!</h3> 
  }

  const markRead = (event:any, messageId:number) => {
    setMessages(messages.map(message => {
      if (message.id === messageId) {
        message.read_status = true;
      }
    return message
    })
    )
  }

  return (
    <AuthContext.Consumer>
     {({ auth }) => {
       const match:any = props.match.params
       if(auth !== parseInt(match.id)) {
        return (
          <Redirect to={`/applicant/${match.id}`} />
        )} else {
          return (
            <div className="message-container">    
              {displayMessages()}
            </div>
          )
        }
       }
     } 
    </AuthContext.Consumer>
  )
}

export default Inbox
