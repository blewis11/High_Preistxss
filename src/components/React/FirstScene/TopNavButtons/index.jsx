import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const TopNavButtons = ({
  buttonColor,
  informationButtonHandler,
  subscriptionButtonHandler,
  instagramButtonHandler,
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
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
      buttonContainer: {
        paddingRight: '10px',
        [theme.breakpoints.down('xs')]: {
          padding: '5px 15px 5px 15px',
          width: '100vw',
        },
      },
      root: {
        ...rootButtonStyles,
      },
      rootSelected: {
        ...rootButtonStyles,
        color: showClose ? '#9489DE' : rootButtonStyles.color,
        backgroundColor: showClose ? 'black' : rootButtonStyles.backgroundColor,
        border: showClose ? `0.5px solid black` : rootButtonStyles.border,
        '&:hover': {
          backgroundColor: 'black',
        },
      },
      closeButtonContainer: {
        position: 'absolute',
        right: '15px',

        [theme.breakpoints.down('xs')]: {
          position: 'static',
          width: '100vw',
          padding: '5px 15px 5px 15px',
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
        position: 'absolute',
        right: '5px',
        display: showClose ? 'none' : 'block',
        [theme.breakpoints.down('xs')]: {
          position: 'relative',
          right: 'auto',
        },
      },
      notSelected: {
        [theme.breakpoints.down('xs')]: {
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
            onClick={instagramButtonHandler}
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
