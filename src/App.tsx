import * as React from 'react'
import './App.css'
import { connector } from './store/connector'


const App = (props:any) => {

  React.useEffect(()=>{
    props.runInit()
    window.addEventListener('mousemove', props.handleMouseMove)
    return () => window.removeEventListener('mousemove', props.handleMouseMove)
  },[])


  return (
      <div className="App">
        <header className="App-header">
          {/* <Canvas /> */}
          <pre style={{border: '1px solid grey', fontSize: '.8rem'}}>{JSON.stringify(props, null, 2)}</pre>
        </header>
      </div>
  )
}

export default connector(App)
