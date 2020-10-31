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
  isOpen: boolean,
  setIsHidden: (value: boolean) => void
  toggleMenu: () => void
}

export type Query = {
  skills: Array<{attribute:string, checked:boolean}>
  values: Array<{attribute:string, checked:boolean}>
}

export interface Creator {
	username?: string
	bio?: string
	first_name?: string
	last_name?: string
	email?: string
	skills?: any
	values?: Array<number>
	id?: number
}