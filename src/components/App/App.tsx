import React, { useState } from 'react'
import { routes } from '../../routes/index'
import { Route, Switch } from 'react-router-dom'

import Header from '../Header/Header'
import Search from '../Search/Search'
import { OpenMenuContext } from '../../contexts/index'
import './App.scss'

const App: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isHidden, setIsHidden] = useState<boolean>(true)
  return (
		<div className="page-wrap">
			<div className="App">
				<OpenMenuContext.Provider value={{
					isOpen,
					toggleMenu: () => {
						setIsHidden(false)
						setIsOpen(!isOpen)
						//add a method here that utilizes setIsOpen and closes the search menu
					}
				}}>
					<Header />
					<Switch>
						{Object.values(routes).map((route:any, index:number) => (
							<Route key={index} {...route} exact path={route.path} />
						))}
					</Switch>
				</OpenMenuContext.Provider>
			</div>
			<div className={isOpen ? 'enter': 'exit'} style={{display: isHidden ? 'none': ''}}>
				<Search />
			</div>
		</div>
  )
}

export default App