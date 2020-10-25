import React from 'react'
import './App.scss'
import { routes } from '../../routes/index'
import { Route, Switch } from 'react-router-dom'

import Header from '../../components/Header/Header'

const App: React.FC = () => {
  return (
		<div className="App">
			<Header />
      <Switch>
        {Object.values(routes).map((route:any, index:number) => (
          <Route key={index} {...route} path={route.path} />
        ))}
      </Switch>
		</div>
  )
}

export default App
