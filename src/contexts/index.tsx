import React from 'react'

type openStateType = {
	isOpen: boolean
	toggleMenu: () => void
	stateChangeHandler: (value: {isOpen: boolean}) => void
}
export const OpenMenuContext = React.createContext<openStateType>({
	isOpen: false,
	toggleMenu: () => {},
	stateChangeHandler: ({}) => {}
})