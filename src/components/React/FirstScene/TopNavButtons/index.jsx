import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const TopNavButtons = ({
  buttonColor,
  informationButtonHandler,
  subscriptionButtonHandler,
  showClose,
  closeButtonHandler,
  selectedIndex,
}) => {
  const useStyles = makeStyles(theme => {
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
      width: '100%',
      transition: 'all 0.3s ease',
      fontFamily: 'Helvetica Neue LT W05_75 Bold',
      color: buttonColor,
      borderRadius: 15,
      border: `0.5px solid ${buttonColor}`,
      fontSize: '10px',
      letterSpacing: '0.06em',
      fontWeight: 'bold',
      filter: showClose ? 'none' : 'drop-shadow(0 0 2px #F4FBFF)',
      ...onHover,
    }

    return {
      buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: '15px',
        width: '100vw',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
        },
      },
      buttonContainer: {
        paddingRight: '10px',
        [theme.breakpoints.down('sm')]: {
          paddingBottom: '10px',
        },
      },
      root: {
        ...rootButtonStyles,
      },
      rootSelected: {
        ...rootButtonStyles,
        borderRadius: 15,
        color: '#9489DE',
        backgroundColor: 'black',
        border: `0.5px solid black`,
        fontSize: '10px',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: 'black',
        },
      },
      hideIfNotSelected: {
        [theme.breakpoints.down('sm')]: {
          visibility: 'hidden',
        },
      },
      closeButtonContainer: {
        position: 'absolute',
        right: '15px',

        [theme.breakpoints.down('sm')]: {
          position: 'relative',
          paddingRight: '10px',
        },
      },
      closeButton: {
        ...rootButtonStyles,
        '&:hover': {
          backgroundColor: 'black',
          color: '#9489DE',
        },
      },
      instagramButton: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
          display: showClose ? 'none' : 'block',
        },
      },
      notSelected: {
        [theme.breakpoints.down('sm')]: {
          display: showClose ? 'none' : 'block',
        },
      },
    }
  })

  const classes = useStyles()

  return (
    <Fragment>
      <div className={classes.buttonsContainer}>
        <div
          className={
            selectedIndex === 1
              ? classes.buttonContainer
              : clsx(classes.notSelected, classes.buttonContainer)
          }
        >
          <Button
            onClick={informationButtonHandler}
            classes={{
              root: selectedIndex === 1 ? classes.rootSelected : classes.root,
            }}
            variant="outlined"
          >
            INFORMATION
          </Button>
        </div>
        <div
          className={
            selectedIndex === 2
              ? classes.buttonContainer
              : clsx(classes.notSelected, classes.buttonContainer)
          }
        >
          <Button
            onClick={subscriptionButtonHandler}
            classes={{
              root: selectedIndex === 2 ? classes.rootSelected : classes.root,
            }}
            variant="outlined"
          >
            SUBSCRIBE
          </Button>
        </div>
        <div className={clsx(classes.buttonContainer, classes.instagramButton)}>
          {/* TODO implementation of this button, only show in mobile or? */}
          <Button
            onClick={subscriptionButtonHandler}
            classes={{ root: classes.root }}
            variant="outlined"
          >
            INSTAGRAM
          </Button>
        </div>
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
