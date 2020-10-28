export interface ApplicantCard extends SearchResponse {
  query: {query: Query}
}

export interface ApplicantProfile {
	username:string,
	bio:string,
	skills:Array<string>,
	values:Array<string>
}

export interface SearchResponse {
  id: number
  username: string
  bio: string
  skills: Array<Attribute>
  values: Array<Attribute>
}

export type AttributeList = {
	skills: Array<Attribute>
	values: Array<Attribute>
}

export type Attribute = {
	attribute: string
	id: number
}

export type OpenMenuType = {
  isOpen: boolean
  toggleMenu: () => void
  stateChangeHandler: (value: {isOpen: boolean}) => void
}

export type Query = {
  skills: Array<{attribute:string, checked:boolean}>
  values: Array<{attribute:string, checked:boolean}>
}