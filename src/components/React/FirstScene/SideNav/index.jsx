import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import { TopNavButtons } from '../TopNavButtons'
import NavContents from './NavContents'
import { Credits } from './Credits'

const SideNav = ({ open, setOpen, selectedIndex, setSelectedIndex }) => {
  const [showCredits, setShowCredits] = useState(false)

  const useStyles = makeStyles(theme => ({
    innerDrawer: {
      width: '31.25vw',
      minWidth: '400px',
      maxWidth: '600px',
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
      },
    },
    paper: {
      backgroundColor: '#9489DE',
      boxShadow: 'none',
    },
    credits: {
      textDecoration: showCredits ? 'underline' : 'underline solid transparent',
      padding: '15px',
      fontSize: '10px',
      textTransform: 'uppercase',
      fontFamily: 'Helvetica Neue LT W05_75 Bold',
      letterSpacing: '0.06em',
      lineHeight: 1,
      position: 'absolute',
      bottom: '5px',
      cursor: 'pointer',
      transition: 'text-decoration 0.3s ease',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }))

  const classes = useStyles()

  const informationHandler = () => {
    setShowCredits(false)
    setSelectedIndex(1)
  }

  const subscriptionHandler = () => {
    setShowCredits(false)
    setSelectedIndex(2)
  }

  const onClose = () => {
    setSelectedIndex(0)
    setShowCredits(false)
    setOpen(false)
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
            buttonColor={'black'}
            showClose
            closeButtonHandler={onClose}
            informationButtonHandler={informationHandler}
            subscriptionButtonHandler={subscriptionHandler}
            selectedIndex={selectedIndex}
          />
          {showCredits ? (
            <Credits />
          ) : (
            <>
              <NavContents selectedIndex={selectedIndex} />
            </>
          )}
        </div>
        <div className={classes.credits} onClick={onClickCredits}>
          CREDITS
        </div>
      </Drawer>
    </Fragment>
  )
}

export { SideNav }
