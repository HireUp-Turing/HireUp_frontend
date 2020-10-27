export interface UserResults {
  id: number
  username: string
  bio: string
  skills: Array<string>
  values: Array<string>
}

export type Query = {
    skills: Array<{attribute:string, checked:boolean}>
    values: Array<{attribute:string, checked:boolean}>
} 

export type attributeList = {
	skills: Array<string>
	values: Array<string>
}

export type openMenuType = {
  isOpen: boolean
	toggleMenu: () => void
	stateChangeHandler: (value: {isOpen: boolean}) => void
}

export interface ApplicantCard extends UserResults {
  query: {query: Query}
}