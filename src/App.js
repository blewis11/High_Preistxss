import React, { Suspense } from 'react'

import { FirstScene as FirstSceneThree } from './components/Three/FirstScene'
import FirstSceneReact from './components/React/FirstScene'

import './App.scss'

const App = props => {
  return (
    <>
      <Suspense fallback={null}>
        <div className="main">
          <FirstSceneReact />
          <div id="hueOverlay" />
          <FirstSceneThree store={props.store} />
        </div>
      </Suspense>
    </>
  )
}

export default App
