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
	return fetch(`${baseUrl}/applicants/search-options`)
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw response
			}
		})
}

export const getAttributes = (attribute: string): Promise<any> => {
	return fetch(`${baseUrl}/${attribute}`)
		.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				throw response
			}
		})
}

export const getNames = (): Promise<any> => {
	let name
	return fetch('https://namey.muffinlabs.com/name.json?type=surname&min_freq=90')
		.then(response => {
			return response.json()
		})
		.then(data => {
			name = data[0]
			return name
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