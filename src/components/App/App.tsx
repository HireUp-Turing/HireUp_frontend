import React, { useState } from 'react'
import { routes } from '../../routes/index'
import { Route, Switch } from 'react-router-dom'

import Header from '../Header/Header'
import Search from '../Search/Search'
import { AuthContext, OpenMenuContext } from '../../contexts/index'
import './App.scss'

const App: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isHidden, setIsHidden] = useState<boolean>(true)
	const [auth, setAuth] = useState<number | undefined>(undefined)
	
  return (
		<div className="page-wrap">
			<div className="App">
				<AuthContext.Provider value={{setAuth}}>
				<OpenMenuContext.Provider value={{
					isOpen,
					setIsHidden,
					toggleMenu: () => {
						setIsOpen(!isOpen)
					}
				}}>
					<Header auth={auth}/>
					<Switch>
						{Object.values(routes).map((route:any, index:number) => (
							<Route key={index} {...route} exact path={route.path} />
						))}
					</Switch>
				</OpenMenuContext.Provider>
				</AuthContext.Provider>
			</div>
			{!isHidden && 
					<div className={isOpen ? 'enter': 'exit'} style={{display: isHidden ? 'none': ''}}>
						<Search />
					</div> 
				}
		</div>
  )
}

export default App