import React, { useState } from 'react'
import { routes } from '../../routes/index'
import { Route, Switch } from 'react-router-dom'

import Header from '../Header/Header'
import Search from '../Search/Search'
import { OpenMenuContext } from '../../contexts/index'
import './App.scss'

const App: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
		<div className="body">

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
		<Search />
		}
		</div>
  )
}

export default App