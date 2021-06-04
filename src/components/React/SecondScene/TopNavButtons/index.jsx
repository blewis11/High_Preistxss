import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const TopNavButtons = ({
  buttonColor,
  informationButtonHandler,
  linksButtonHandler,
  soundHandler,
  closeButtonHandler,
  selectedIndex,
  showClose,
  avatarSelected = false
}) => {
  const useStyles = makeStyles(theme => {
    const onHover = showClose
      ? {
        '&:hover': {
          backgroundColor: '#9489de',
          color: '#121212',
        },
      }
      : {
        '&:hover': {
          backgroundColor: 'white',
          color: '#9489dd',
        },
      }

    const rootButtonStyles = {
      zIndex: '1 !important',
      width: '100%',
      transition: 'all 0.3s ease',
      fontFamily: 'Helvetica Neue LT W05_75 Bold',
      color: buttonColor,
      borderRadius: 15,
      border: `0.5px solid ${buttonColor}`,
      fontSize: '10px',
      letterSpacing: '0.06em',
      filter: showClose ? 'none' : 'drop-shadow(0 0 2px #F4FBFF)',
      ...onHover,
    }

    return {
      buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: '15px',
        width: showClose ? '100%' : '100vw',
        flexShrink: 0,
        flexBasis: 'auto',
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
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
        color: showClose ? '#121212' : rootButtonStyles.color,
        backgroundColor: showClose ? '#9489DE' : rootButtonStyles.backgroundColor,
        border: showClose ? `0.5px solid #9489DE` : rootButtonStyles.border,
        // '&:hover': {
        //   backgroundColor: '#121212',
        // },
      },
      closeButtonContainer: {
        marginLeft: 'auto',
        right: '15px',

        [theme.breakpoints.down('xs')]: {
          position: 'static',
          width: '100%',
          paddingTop: '5px',
        },
      },
      closeButton: {
        ...rootButtonStyles,
        '&:hover': {
          backgroundColor: '#9489de',
          color: '#121212',
        },
      },
      soundButton: {
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
        <AllButtons
          classes={classes}
          selectedIndex={selectedIndex}
          informationButtonHandler={informationButtonHandler}
          linksButtonHandler={linksButtonHandler}
          closeButtonHandler={closeButtonHandler}
          soundHandler={soundHandler}
          showClose={showClose}
          avatarSelected={avatarSelected}
        />
      </div>
    </Fragment>
  )
}

const AllButtons = ({
  classes,
  selectedIndex,
  informationButtonHandler,
  linksButtonHandler,
  soundHandler,
  closeButtonHandler,
  showClose,
  avatarSelected
}) => {

  return (
    <Fragment>
      <div
        className={
          selectedIndex === 1
            ? classes.buttonContainer
            : clsx(classes.notSelected, classes.buttonContainer)
        }
      >
        {!avatarSelected && <Button
          onClick={informationButtonHandler}
          classes={{
            root: selectedIndex === 1 ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          INFORMATION
        </Button>}
      </div>
      <div
        className={
          selectedIndex === 2
            ? classes.buttonContainer
            : clsx(classes.notSelected, classes.buttonContainer)
        }
      >
        {!avatarSelected && <Button
          onClick={linksButtonHandler}
          classes={{
            root: selectedIndex === 2 ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          JOIN US
        </Button>}
      </div>
      <div className={clsx(classes.buttonContainer, classes.soundButton)}>
        <Button onClick={soundHandler} classes={{ root: classes.root }} variant="outlined">
          SOUND OFF
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
    </Fragment>
  )
}

export { TopNavButtons }