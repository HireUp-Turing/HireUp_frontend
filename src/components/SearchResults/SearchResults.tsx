import React from 'react'

import { users } from '../../assets/fake-users'
import ApplicantPreview from '../ApplicantPreview/ApplicantPreview'
import './SearchResults.scss'

const SearchResults: React.FC = () => {
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