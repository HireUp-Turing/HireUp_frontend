import React from 'react'
import './App.scss'
import { routes } from '../../routes/index'
import { Route, Switch } from 'react-router-dom'

import Header from '../../components/Header/Header'

const App: React.FC = () => {
  return (
		<main className="App">
			<Header />
			<p>This is some text so we can see what these cool fonts look like and if we like them we are going to KEEP USING THEM!</p>
      <Switch>
        {Object.values(routes).map((route:any, index:number) => (
          <Route key={index} {...route} path={route.path} />
        ))
        }
      </Switch>
		</main>
  )
}

export default App
