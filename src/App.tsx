import * as React from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'

import { connector } from './store/connector'

import Scrawl from './pages/Scrawl'


const App = (props:any) => {

  // React.useEffect(()=>{
  //   props.appInit()
  // },[])


  return (
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path='/' element={<p>Scrawler</p>} />
            <Route path='scrawl' element={<Scrawl />} />
            <Route path='*' element={<p>No Page at this Route</p>} />

          </Routes>
          {/* <Canvas /> */}
        
        </header>
      </div>
  )
}

export default App
