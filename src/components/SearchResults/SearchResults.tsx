import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { users as fakeUsers} from '../../assets/fake-users'
import { UserResults } from '../../assets/definitions'
import ApplicantPreview from '../ApplicantPreview/ApplicantPreview'
import './SearchResults.scss'

interface SearchRedirectProps extends RouteComponentProps {}

type Query = {
    skills: Array<object>
    values: Array<object>
} 

const SearchResults: React.FC<SearchRedirectProps> = (props) => {
  const [users, setUsers] = useState<Array<UserResults>>([])

  let query: unknown | any = props.location.state

  useEffect(() => {
    fakeUserFetch(query)
    .then(data => setUsers(data))
  }, [query])

  const fakeUserFetch = async (query: Query) => {
    console.log(query)
    return await fakeUsers
  }
  
  let userData = users.map((user, i) => {
    return ( 
      <ApplicantPreview 
        key={`applicant-preview-${i}`}
        id={user.id}
        username={user.username}
        bio={user.bio}
        updated_at={user.updated_at}
        skills={user.skills}
        values={user.values}
      />
    )
  })
  return (
    <main className="search-results">
      {userData}
    </main>
  )
}

export default SearchResults