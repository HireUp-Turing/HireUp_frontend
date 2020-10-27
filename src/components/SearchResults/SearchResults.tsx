import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { users as fakeUsers} from '../../assets/fake-users'
import { UserResults } from '../../assets/definitions'
import ApplicantPreview from '../ApplicantPreview/ApplicantPreview'
import './SearchResults.scss'

interface Props extends RouteComponentProps {}

const SearchResults: React.FC<Props> = (props) => {
  const [users, setUsers] = useState<Array<UserResults>>([])
  useEffect(() => { 
    fakeUserFetch()
    .then(data => setUsers(data))
  }, [])

  const fakeUserFetch = async () => {
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
      <p>Hello Search Results</p>
    </main>
  )
}

export default SearchResults