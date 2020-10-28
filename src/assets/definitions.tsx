import { RouteComponentProps } from 'react-router-dom'

export interface ApplicantCard extends UserResults {
  query: {query: Query}
}

export interface ApplicantProfile {
  username:string, bio:string, skills:Array<string>, values:Array<string>
}

export interface ApplicantProps extends RouteComponentProps {}

export type AttributeList = {
	skills: Array<string>
	values: Array<string>
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

export interface SearchRedirectProps extends RouteComponentProps {}
export interface UserResults {
  id: number
  username: string
  bio: string
  skills: Array<string>
  values: Array<string>
}


