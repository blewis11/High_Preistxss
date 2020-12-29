import React, { Suspense } from 'react'
import { connect } from 'react-redux'

import { toggleLight } from './redux/Counter/actions'
import { FirstScene, HeaderGrass } from './components/FirstScene'
import './App.scss'

const App = props => {
  return (
    <>
      <HeaderGrass />
      <div className="main">
        {/* <div id="hueOverlay" /> */}
        <Suspense fallback={null}>
          <FirstScene />
        </Suspense>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
