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
	return fetch(`${baseUrl}/search-options`)
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw response
			}
		})
}