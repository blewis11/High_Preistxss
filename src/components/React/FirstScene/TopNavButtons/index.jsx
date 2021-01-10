import React, { Fragment } from 'react'
import { connect } from 'react-redux'
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
  buttons,
}) => {
  const useStyles = makeStyles(theme => {
    const onHover = showClose
      ? {
          '&:hover': {
            backgroundColor: '#121212',
            color: '#9489DE',
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
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'row',
        padding: '15px',
        width: showClose ? '100%' : '100vw',
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
          justifyContent: 'flex-start',
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
        backgroundColor: showClose ? '#121212' : rootButtonStyles.backgroundColor,
        border: showClose ? `0.5px solid #121212` : rootButtonStyles.border,
        '&:hover': {
          backgroundColor: '#121212',
        },
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
          backgroundColor: '#121212',
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
        <AllButtons
          classes={classes}
          selectedIndex={selectedIndex}
          informationButtonHandler={informationButtonHandler}
          subscriptionButtonHandler={subscriptionButtonHandler}
          instagramButtonHandler={instagramButtonHandler}
          closeButtonHandler={closeButtonHandler}
          showClose={showClose}
          buttons={buttons}
        />
      </div>
    </Fragment>
  )
}

const AllButtons = ({
  classes,
  selectedIndex,
  informationButtonHandler,
  subscriptionButtonHandler,
  instagramButtonHandler,
  closeButtonHandler,
  showClose,
  buttons,
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
        <Button
          onClick={informationButtonHandler}
          classes={{
            root: selectedIndex === 1 ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          {buttons.information}
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
          {buttons.subscribe}
        </Button>
      </div>
      <div className={clsx(classes.buttonContainer, classes.instagramButton)}>
        {/* TODO implementation of this button, only show in mobile or? */}
        <Button
          onClick={instagramButtonHandler}
          classes={{ root: classes.root }}
          variant="outlined"
        >
          {buttons.instagram}
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

const mapStateToProps = state => {
  return {
    buttons: state.text.buttons,
  }
}

export default connect(mapStateToProps)(TopNavButtons)
