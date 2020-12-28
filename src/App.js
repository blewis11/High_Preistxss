import React, { Suspense } from "react"
import { connect } from "react-redux"

import { toggleLight } from './redux/Counter/actions'
import { FirstScene, HeaderGrass } from './components/FirstScene'
import { LandscapeExample, HeaderLandscape } from './components/LandscapeTest'
import "./App.scss"

const App = (props) => {
  return (
    <>
      {/* <HeaderGrass />  */}
      <div className="main">
        <Suspense fallback={null}>
          <FirstScene />
        </Suspense>
      </div>

      {/* <HeaderLandscape />
      <div className="main">
        <Suspense fallback={null}>
          <LandscapeExample />
        </Suspense>
      </div> */}
    </>
  )
}


const mapStateToProps = state => {
  return {
    show_light: state.light.show_light,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleLight: () => dispatch(toggleLight()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
