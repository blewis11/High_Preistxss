import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const TopNavButtons = ({
  buttonColor,
  informationButtonHandler,
  subscriptionButtonHandler,
  showClose,
  closeButtonHandler,
  selectedIndex,
}) => {
  const onHover = showClose
    ? {
        '&:hover': {
          backgroundColor: 'black',
          color: '#9489DE',
        },
      }
    : {
        '&:hover': {
          backgroundColor: 'white',
          color: 'black',
        },
      }

  const rootButtonStyles = {
    color: buttonColor,
    borderRadius: 15,
    border: `0.5px solid ${buttonColor}`,
    fontSize: '11px',
    fontWeight: 'bold',
    filter: showClose ? 'none' : 'drop-shadow(0 0 2px #F4FBFF)',
    ...onHover,
  }

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
      ...rootButtonStyles,
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
    closeButton: {
      ...rootButtonStyles,
      '&:hover': {
        backgroundColor: 'black',
        color: '#9489DE',
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
              classes={{ root: classes.closeButton }}
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

export { TopNavButtons }
