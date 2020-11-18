import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import ApplicantPreview from '../ApplicantPreview/ApplicantPreview'
import { search } from '../../assets/api-calls'
import { ApplicantInfo } from '../../assets/definitions'
import './SearchResults.scss'

const SearchResults: React.FC<RouteComponentProps> = (props) => {
  const [applicants, setApplicants] = useState<Array<ApplicantInfo>>([])

  let query: unknown | any = props.location.state

  useEffect(() => {
    const filterMatches = (data:ApplicantInfo) => {
      const attributes = [...data.skills, ...data.values]
      const request = [...query.query.skills, ...query.query.values]
      return attributes.filter(attribute => request.some(tag => tag.attribute === attribute))
		}

    const queryIds = {
      "skills": query.query.skills.map((skill:any) => skill.id),
      "values": query.query.values.map((value:any) => value.id)
    }

    search(queryIds)
    	.then(data => { 
        const results = data.sort((a:ApplicantInfo, b:ApplicantInfo) => {
          return filterMatches(b).length - filterMatches(a).length
        })
        setApplicants(results)
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