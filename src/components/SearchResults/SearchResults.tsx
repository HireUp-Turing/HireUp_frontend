import React, { useState, useEffect } from 'react'

import { users as fakeUsers} from '../../assets/fake-users'
import { UserResults } from '../../assets/definitions'
import ApplicantPreview from '../ApplicantPreview/ApplicantPreview'
import './SearchResults.scss'

const SearchResults: React.FC = () => {
  const [users, setUsers] = useState<Array<UserResults>>([])

  useEffect(() => {
    fakeUserFetch()
    .then(data => setUsers(data))
  }, [])

  const fakeUserFetch = async () => {
    return await fakeUsers
  }
  
  let userData = users.map((user) => {
    return ( 
      <ApplicantPreview 
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
      <p>Hello Search Results</p>
    </main>
  )
}

export default SearchResults