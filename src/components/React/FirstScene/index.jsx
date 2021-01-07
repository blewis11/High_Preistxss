import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'

import WithSidebarText from '../hooks/WithSidebarText.jsx'
import { TopNavButtons } from './TopNavButtons'
import { SideNav } from './SideNav'
import { Logo } from './Logo'

const useStyles = makeStyles({
  loaderContainer: {
    zIndex: 1,
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Loader = ({ showLoader }) => {
  const classes = useStyles()

  return (
    <Fade in={showLoader} timeout={{ enter: 0, exit: 2000 }}>
      <div className={classes.loaderContainer}>Loading...</div>
    </Fade>
  )
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

  const instagramButtonHandler = () => {
    const win = window.open('https://www.instagram.com/thehighpriestxss/', '_blank')
    win.focus()
  }

  return (
    <div className="sidebarContainer">
      <WithSidebarText />
      <Loader showLoader={isLoading} />

      <TopNavButtons
        selectedIndex={selectedIndex}
        buttonColor={'white'}
        informationButtonHandler={informationHandler}
        subscriptionButtonHandler={subscriptionHandler}
        instagramButtonHandler={instagramButtonHandler}
      />

      <SideNav
        open={open}
        setOpen={setOpen}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <Logo />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.state.isLoading,
  }
}

export default connect(mapStateToProps)(FirstScene)
