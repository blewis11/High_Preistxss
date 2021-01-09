import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { Loader } from './Loader/index.jsx'
import WithSidebarText from '../hooks/WithSidebarText.jsx'
import { TopNavButtons } from './TopNavButtons'
import { SideNav } from './SideNav'
import { Logo } from './Logo'

const useStyles = makeStyles({
  loaderContainer: {
    zIndex: '2000 !important',
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#121212',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  credits: {
    color: '#ffffff',
    filter: 'drop-shadow(0 0 2px #F4FBFF)',
    textDecoration: 'underline solid transparent',
    padding: '15px',
    fontSize: '10px',
    textTransform: 'uppercase',
    fontFamily: 'Helvetica Neue LT W05_75 Bold',
    letterSpacing: '0.06em',
    lineHeight: 1,
    position: 'fixed',
    bottom: '5px',
    cursor: 'pointer',
    transition: 'text-decoration 0.3s ease',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})

const LoaderContainer = ({ showLoader }) => {
  const [hideLoader, setHideLoader] = useState(false)

  // TODO: figure out graceful solution, for some reason even when showLoader is false - this renders buttons unclickable (overlay somehow stays present)
  useEffect(() => {
    if (!showLoader) {
      setTimeout(() => {
        setHideLoader(true)
      }, 1500)
    }
  }, [showLoader])

  return hideLoader ? <div /> : <Loader isLoaded={!showLoader} />
}

const FirstScene = ({ isLoading }) => {
  const [inSubscribedState, setSubscribedState] = useState(
    window.location.pathname === '/subscribed',
  )

  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showCredits, setShowCredits] = useState(false)

  useEffect(() => {
    if (!isLoading && inSubscribedState) {
      setOpen(true)
    }
  }, [isLoading])

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
    if (win) {
      win.focus()
    }
  }

  const classes = useStyles()

  const onClickCredits = () => {
    setShowCredits(true)
    setSelectedIndex(0)
    setOpen(true)
  }

  return (
    <div className="sidebarContainer">
      <WithSidebarText />
      <LoaderContainer showLoader={isLoading} />

      <TopNavButtons
        selectedIndex={selectedIndex}
        buttonColor={'white'}
        informationButtonHandler={informationHandler}
        subscriptionButtonHandler={subscriptionHandler}
        instagramButtonHandler={instagramButtonHandler}
        inSubscribedState={false}
      />

      <SideNav
        open={open}
        setOpen={setOpen}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        inSubscribedState={inSubscribedState}
        setSubscribedState={setSubscribedState}
        showCredits={showCredits}
        setShowCredits={setShowCredits}
      />

      <div className={classes.credits} onClick={onClickCredits}>
        CREDITS
      </div>
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
