import React from 'react'

import { openStateType } from '../assets/definitions'

export const OpenMenuContext = React.createContext<openStateType>({
	isOpen: false,
	toggleMenu: () => {},
	stateChangeHandler: ({}) => {}
})