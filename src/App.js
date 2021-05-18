import React, { Suspense } from 'react'
import { connect } from 'react-redux'

import { FirstScene as FirstSceneThree } from './components/Three/FirstScene'
import { SecondScene as SecondSceneThree } from './components/Three/SecondScene'
import FirstSceneReact from './components/React/FirstScene'
import SecondSceneReact from './components/React/SecondScene'
import './App.scss'

const App = props => {
  return (
    <>
      {
        props.sceneNumber === 1 ?
          <Suspense fallback={null}>
            <div className="main">
              <FirstSceneReact />
              <div id="hueOverlay" />
              <FirstSceneThree store={props.store} />
            </div>
          </Suspense> :
          <Suspense fallback={null}>
            <div className="main">
              <SecondSceneReact />
              <div id="hueOverlay" />
              <SecondSceneThree store={props.store} />
            </div>
          </Suspense>
      }

    </>
  )
}

const mapStateToProps = state => {
  return {
    sceneNumber: state.state.sceneNumber
  }
}

export default connect(mapStateToProps)(App)
