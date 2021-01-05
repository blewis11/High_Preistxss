import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import WithSidebarText from '../hooks/WithSidebarText.jsx'
import { TopNavButtons } from './TopNavButtons'
import { SideNav } from './SideNav'
import { Logo } from './Logo'

const Loader = () => {
  return <div>Loading...</div>
}

const FirstScene = ({ isLoading }) => {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const informationHandler = () => {
    setSelectedIndex(1)
    setOpen(true)
  }

  const subscriptionHandler = () => {
    setSelectedIndex(2)
    setOpen(true)
  }

  useEffect(() => {
    console.log(`is loading set to ${isLoading}`)
  }, [isLoading])

  return (
    <div className="sidebarContainer">
      <WithSidebarText />
      {!open && (
        <TopNavButtons
          selectedIndex={selectedIndex}
          buttonColor={'white'}
          informationButtonHandler={informationHandler}
          subscriptionButtonHandler={subscriptionHandler}
        />
      )}
      <SideNav
        open={open}
        setOpen={setOpen}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <Logo />

      {isLoading && <Loader />}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.state.isLoading,
  }
}

export default connect(mapStateToProps)(FirstScene)
