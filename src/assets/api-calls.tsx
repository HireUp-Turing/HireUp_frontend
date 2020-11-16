import { EmployerMessage } from './definitions'
import { cleanApplicants, cleanAttributes } from './helpers'
const baseUrl = 'https://hireup-be.herokuapp.com/api/v1'

export const getApplicants = (): Promise<any> => {
	return fetch(`${baseUrl}/applicants`)
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw response
			}
		})
}

export const search = 
	(query: {skills:Array<number>, values: Array<number>}):Promise<any> => {
		return fetch(`${baseUrl}/applicants/search`, {
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(query)
		})
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw response
			}
		})
		.then(response => {
			return cleanApplicants(response.data)
		})	
	}

export const getApplicantById = (id: number): Promise<any> => {
	return fetch(`${baseUrl}/applicants/${id}`)
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw response
			}
		})
}

export const getSearchOptions = (): Promise<any> => {
	return fetch(`${baseUrl}/applicants/search-options`)
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw response
			}	
		})
		.then(response => {
			return {
				skills: cleanAttributes(response.data[0].skills),
				values: cleanAttributes(response.data[0].values)
			}
		})
}

export const getAttributes = (attribute:string): Promise<any> => {
	return fetch(`${baseUrl}/${attribute}`)
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw response
			}
		})
		.then(response => {
			return cleanAttributes(response.data)
		})	
}

export const postApplicant = (applicant: any): Promise<any> => {
	return fetch(`${baseUrl}/applicants`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(applicant)
	}).then(response => {
		if (response.ok) {
			return response.json()
		} else {
			throw response
		}
	})
}

export const getMessages = (id:number): Promise<any> => {
	return fetch(`${baseUrl}/messages?applicant_id=${id}`)
		.then(response => {
			if (response.ok) {
				return response.json()				
			} else {
				throw response
			}
		})
}

export const sendMessage = (id:number, message:EmployerMessage): Promise<any> => {
	return fetch(`${baseUrl}/messages`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...message,
			applicant_id: id
		})
	}).then(response => {
		return response
	})
}

export const getNames = (req?:string): Promise<any> => {
	let name = req || '?type=surname&min_freq=90'
	return fetch(`https://namey.muffinlabs.com/name.json${name}`)
		.then(response => {
			return response.json()
		})
		.then(data => {
			name = data[0]
			return name
		})
}

