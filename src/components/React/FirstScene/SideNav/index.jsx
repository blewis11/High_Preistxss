import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import { TopNavButtons } from '../index.jsx'
import NavContents from './NavContents'

const useStyles = makeStyles({
  innerDrawer: {
    width: '30vw',
    minWidth: '370px',
    maxWidth: '500px',
  },
  paper: {
    backgroundColor: '#9489DE',
  },
})

const SideNav = ({ open, setOpen, selectedIndex, setSelectedIndex }) => {
  const classes = useStyles()

  const informationHandler = () => {
    setSelectedIndex(1)
  }

  const subscriptionHandler = () => {
    setSelectedIndex(2)
  }

  const onClose = () => {
    setSelectedIndex(0)
    setOpen(false)
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
          <NavContents selectedIndex={selectedIndex} />
        </div>
      </Drawer>
    </Fragment>
  )
}

export { SideNav }
