import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { getMessages } from '../../assets/api-calls'
import './Inbox.scss'

const Inbox: React.FC<RouteComponentProps> = (props) => {
  const [messages, setMessages] = useState('')

  useEffect(() => {
    const match:any = props.match.params
    getMessages(match.id).then(response => {
      setMessages(response.data)
      console.log(response.data)
    })
  }, [])

  const displayMessages = () => {
    return messages.map((message, i) => {
      <div></div>
    })
  }

  return (
    <div>hello world</div>
  )
}

export default Inbox
