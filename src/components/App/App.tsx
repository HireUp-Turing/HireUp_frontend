import React, { useState } from 'react'
import { routes } from '../../routes/index'
import { Route, Switch } from 'react-router-dom'

import Header from '../../components/Header/Header'
import { OpenMenuContext } from '../../contexts/index'
import './App.scss'

const App: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
		<div className="body">
		<section className="search-window">
			hello
		</section>
		<div className="App">
			<OpenMenuContext.Provider value={{
				isOpen,
				toggleMenu: () => setIsOpen(!isOpen),
				stateChangeHandler: (newState) => setIsOpen(newState.isOpen)
			}}>
				<Header />
				<Switch>
					{Object.values(routes).map((route:any, index:number) => (
						<Route key={index} {...route} exact path={route.path} />
					))}
				</Switch>
			</OpenMenuContext.Provider>
		</div>
		</div>
  )
}

export default App