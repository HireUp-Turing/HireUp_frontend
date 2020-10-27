import React from 'react'

import { openMenuType } from '../assets/definitions'

export const OpenMenuContext = React.createContext<openMenuType>({
	isOpen: false,
	toggleMenu: () => {},
	stateChangeHandler: () => {}
})