// types
export type Profile = {
	id?: number
	first_name?: string
	last_name?: string
	username: string
	email?: string
	bio: string
}

export type Attribute = {
	attribute?: string
	id?: number
}

export type ApiAttribute = {
	attribute: string
	id: number
}

export type Query = {
	skills: Array<{ attribute: string, checked: boolean }>
	values: Array<{ attribute: string, checked: boolean }>
}

export type EmployerMessage = {
	employer_name: string
	employer_email: string
	body: string
}

export type HeaderProps = {
	auth: number | undefined
}

// interfaces
export interface ApplicantCard extends ApplicantInfo {
	query: { query: Query }
}

export interface NewApplicant extends Profile {
	skills: Array<number>
	values: Array<number>
}

export interface ApplicantInfo extends Profile {
	skills: Array<Attribute>
	values: Array<Attribute>
}

// context types
export type OpenMenuType = {
	isOpen: boolean,
	setIsHidden: (value: boolean) => void
	toggleMenu: () => void
}

export type AuthContextType = {
	auth: number | undefined
	setAuth: (value: number | undefined) => void
}

export type MessageFormContextType = {
	messageForm: boolean
	showMessageForm: (value: boolean) => void
}