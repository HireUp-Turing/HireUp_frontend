import React from 'react'

import { OpenMenuType } from '../assets/definitions'

export const OpenMenuContext = React.createContext<OpenMenuType>({
	isOpen: false,
	toggleMenu: () => {},
	stateChangeHandler: () => {}
})