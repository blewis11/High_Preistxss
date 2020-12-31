import React, { useState, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { SideNav } from './SideNav'

const TopNavButtons = ({
  buttonColor,
  informationButtonHandler,
  subscriptionButtonHandler,
  showClose,
  closeButtonHandler,
  selectedIndex,
}) => {
  const useStyles = makeStyles(theme => ({
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: '15px',
    },
    informationButtonContainer: {
      paddingRight: '10px',
    },
    closeButtonContainer: {
      position: 'absolute',
      right: '15px',
    },
    root: {
      color: buttonColor,
      borderRadius: 15,
      border: `0.5px solid ${buttonColor}`,
      fontSize: '11px',
      fontWeight: 'bold',
    },
    rootSelected: {
      borderRadius: 15,
      color: '#9489DE',
      backgroundColor: 'black',
      border: `0.5px solid black`,
      fontSize: '11px',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: 'black',
      },
    },
  }))

  const classes = useStyles()

  return (
    <Fragment>
      <div className={classes.buttonsContainer}>
        <div className={classes.informationButtonContainer}>
          <Button
            onClick={informationButtonHandler}
            classes={{ root: selectedIndex === 1 ? classes.rootSelected : classes.root }}
            variant="outlined"
          >
            INFORMATION
          </Button>
        </div>
        <Button
          onClick={subscriptionButtonHandler}
          classes={{ root: selectedIndex === 2 ? classes.rootSelected : classes.root }}
          variant="outlined"
        >
          SUBSCRIPTION
        </Button>
        {showClose && (
          <div className={classes.closeButtonContainer}>
            <Button
              onClick={closeButtonHandler}
              classes={{ root: classes.root }}
              variant="outlined"
            >
              CLOSE
            </Button>
          </div>
        )}
      </div>
    </Fragment>
  )
}

const FirstScene = () => {
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

  return (
    <div className="sidebarContainer">
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
    </div>
  )
}

export { FirstScene, TopNavButtons }
