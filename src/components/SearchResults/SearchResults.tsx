import React, { useState, useEffect } from 'react'

import ApplicantPreview from '../ApplicantPreview/ApplicantPreview'
import { getApplicants } from '../../assets/api-calls'
import { SearchResponse } from '../../assets/definitions'
import { RouteComponentProps } from 'react-router-dom'
import './SearchResults.scss'


const SearchResults: React.FC<RouteComponentProps> = (props) => {
  const [applicants, setApplicants] = useState<Array<SearchResponse>>([])

  let query: unknown | any = props.location.state

  useEffect(() => {
    getApplicants()
    	.then(data => {
        console.log("QUERY CHANGE! FETCH")
        setApplicants(data.data)
      })
  }, [query])
  
  let applicantList = applicants.map((user, i) => {
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
      {applicantList}
    </main>
  )
}

export default SearchResults