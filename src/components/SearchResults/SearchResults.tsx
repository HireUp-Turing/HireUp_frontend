import React, { useState, useEffect } from 'react'

import ApplicantPreview from '../ApplicantPreview/ApplicantPreview'
import { getApplicants, search } from '../../assets/api-calls'
import { SearchResponse } from '../../assets/definitions'
import { RouteComponentProps } from 'react-router-dom'
import './SearchResults.scss'

const SearchResults: React.FC<RouteComponentProps> = (props) => {
  const [applicants, setApplicants] = useState<Array<SearchResponse>>([])

  let query: unknown | any = props.location.state

  useEffect(() => {
    const filterMatches = (data:SearchResponse) => {
      const attributes = [...data.skills, ...data.values]
      const request = [...query.query.skills, ...query.query.values]
      return attributes.filter(attribute => request.some(tag => tag.attribute === attribute))
    } 

    const queryIds = {
      "skills": query.skills.map((skill:any) => skill.id),
      "values": query.values.map((value:any) => values.id)
    }

    search(queryIds)
    	.then(data => {   
        // const results = data.data.sort((a:SearchResponse, b:SearchResponse) => {
        //   return filterMatches(b).length - filterMatches(a).length
        // })
        // setApplicants(results)
        // console.log(data.json())
        // setApplicants(data.data)
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