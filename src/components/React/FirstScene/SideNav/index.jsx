import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

const useStyles = makeStyles({
  innerDrawer: {
    width: '30vw',
  },
  paper: {
    backgroundColor: '#9489DE',
  },
})

const SideNav = ({ open, setOpen }) => {
  const classes = useStyles()

  return (
    <Fragment>
      <Drawer
        open={open}
        onClose={() => setOpen(!open)}
        BackdropProps={{ invisible: true }}
        classes={{ paper: classes.paper }}
      >
        <div className={classes.innerDrawer}></div>
      </Drawer>
    </Fragment>
  )
}

export { SideNav }
