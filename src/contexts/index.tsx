import React from 'react'

import { OpenMenuType, AuthContextType } from '../assets/definitions'

export const OpenMenuContext = React.createContext<OpenMenuType>({
	isOpen: false,
	setIsHidden: () => {},
	toggleMenu: () => {}
})

export const AuthContext = React.createContext<AuthContextType>({
	auth: undefined,
	setAuth: () => {}
})