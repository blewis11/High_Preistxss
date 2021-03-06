import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import TopNavButtons from '../TopNavButtons'
import NavContents from './NavContents'
import Credits from './Credits'

const SideNav = ({
  open,
  setOpen,
  selectedIndex,
  setSelectedIndex,
  inSubscribedState,
  setSubscribedState,
  showCredits,
  setShowCredits,
}) => {
  const useStyles = makeStyles(theme => ({
    innerDrawer: {
      width: '31.25vw',
      minWidth: '400px',
      maxWidth: '600px',
      overflowX: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        width: '100vw',
        minWidth: '100vw',
        maxWidth: '100vw',
      },
    },
    paper: {
      backgroundColor: '#9489DE',
      boxShadow: 'none',
    },
    credits: {
      width: '100%',
      backgroundColor: '#9489DE',
      textDecoration: showCredits ? 'underline' : 'underline solid transparent',
      padding: '0 15px 15px 15px',
      fontSize: '10px',
      textTransform: 'uppercase',
      fontFamily: 'Helvetica Neue LT W05_75 Bold',
      letterSpacing: '0.06em',
      lineHeight: 1,
      marginTop: 'auto',
      cursor: 'pointer',
      transition: 'text-decoration 0.3s ease',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }))

  const classes = useStyles()

  const removeSubscribedState = () => {
    if (inSubscribedState) {
      window.history.pushState(null, null, '/')
      setSubscribedState(false)
    }
  }

  const informationHandler = () => {
    removeSubscribedState()
    setShowCredits(false)
    setSelectedIndex(1)
  }

  const subscriptionHandler = () => {
    removeSubscribedState()
    setShowCredits(false)
    setSelectedIndex(2)
  }

  const onClose = () => {
    if (inSubscribedState) {
      window.history.pushState(null, null, '/')
    }
    setShowCredits(false)
    setOpen(false)
    setTimeout(() => {
      setSubscribedState(false)
      setSelectedIndex(0)
    }, 300) // kinda hacky..but progress hook seems to stop at 95% and then wait a few moments
  }

  const onClickCredits = () => {
    setShowCredits(true)
    setSelectedIndex(0)
  }

  return (
    <Fragment>
      <Drawer
        open={open}
        onClose={onClose}
        BackdropProps={{ invisible: true }}
        classes={{ paper: classes.paper }}
      >
        <div className={classes.innerDrawer}>
          <TopNavButtons
            buttonColor={'#121212'}
            showClose
            closeButtonHandler={onClose}
            informationButtonHandler={informationHandler}
            subscriptionButtonHandler={subscriptionHandler}
            selectedIndex={selectedIndex}
            inSubscribedState={inSubscribedState}
          />
          {showCredits ? (
            <Credits />
          ) : (
            <>
              <NavContents selectedIndex={selectedIndex} inSubscribedState={inSubscribedState} />
            </>
          )}
          <div className={classes.credits} onClick={onClickCredits}>
            CREDITS
          </div>
        </div>
      </Drawer>
    </Fragment>
  )
}

export { SideNav }
