import React, { useState, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { SideNav } from './SideNav'

const TopNavButtons = ({ buttonColor, informationButtonHandler, subscriptionButtonHandler }) => {
  const useStyles = makeStyles(theme => ({
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: '20px',
    },
    informationButtonContainer: {
      paddingRight: '10px',
    },
    root: {
      color: buttonColor,
      borderRadius: 15,
      border: `0.5px solid ${buttonColor}`,
      fontSize: '11px',
      fontWeight: 'bold'
    },
  }))

  const classes = useStyles()

  return (
    <Fragment>
      <div className={classes.buttonsContainer}>
        <div className={classes.informationButtonContainer}>
          <Button
            onClick={informationButtonHandler}
            classes={{ root: classes.root }}
            variant="outlined"
          >
            INFORMATION
          </Button>
        </div>
        <Button
          onClick={subscriptionButtonHandler}
          classes={{ root: classes.root }}
          variant="outlined"
        >
          SUBSCRIPTION
        </Button>
      </div>
    </Fragment>
  )
}

const FirstScene = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="sidebarContainer">
      <TopNavButtons
        buttonColor={'white'}
        informationButtonHandler={() => setOpen(true)}
        subscriptionButtonHandler={() => setOpen(true)}
      />
      <SideNav open={open} setOpen={setOpen} />
    </div>
  )
}

export { FirstScene }
