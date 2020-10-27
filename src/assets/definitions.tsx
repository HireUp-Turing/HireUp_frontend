export interface UserResults {
  id: number
  username: string
  bio: string
  updated_at: string
  skills: Array<string>
  values: Array<string>
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