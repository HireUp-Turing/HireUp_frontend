import React, { useState, useEffect } from 'react'

import { users as fakeUsers} from '../../assets/fake-users'
import { UserResults, Query, SearchRedirectProps } from '../../assets/definitions'
import ApplicantPreview from '../ApplicantPreview/ApplicantPreview'
import './SearchResults.scss'


const SearchResults: React.FC<SearchRedirectProps> = (props) => {
  const [users, setUsers] = useState<Array<UserResults>>([])

  let query: unknown | any = props.location.state

  useEffect(() => {
    fakeUserFetch(query)
    .then(data => setUsers(data))
  }, [query])

  const fakeUserFetch = async (query: Query) => {
    return await fakeUsers
  }
  
  let userData = users.map((user, i) => {
    return ( 
      <ApplicantPreview 
        key={`applicant-preview-${i}`}
        id={user.id}
        username={user.username}
        bio={user.bio}
        skills={user.skills}
        values={user.values}
        query={query}
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