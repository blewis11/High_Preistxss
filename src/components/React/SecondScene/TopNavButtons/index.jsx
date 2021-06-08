import React, { Fragment, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import useSound from 'use-sound'
import theme from './highpriestxss_V06.mp3'
import { connect } from 'react-redux'

const TopNavButtons = ({
  buttonColor,
  informationButtonHandler,
  linksButtonHandler,
  soundHandler,
  soundOn,
  closeButtonHandler,
  selectedIndex,
  showClose,
  onClickExplore,
  buttons,
  avatarSelected = false,
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
      exploreButtonContainer: {
        marginLeft: 'auto',
        width: '100%',
        display: 'none',
        bottom: 0,
        position: 'fixed',
        padding: '15px',
        [theme.breakpoints.down('xs')]: {
          display: 'block',
        },
      },
      exploreButton: {
        ...rootButtonStyles,
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
          soundOn={soundOn}
          showClose={showClose}
          avatarSelected={avatarSelected}
          onClickExplore={onClickExplore}
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
  linksButtonHandler,
  soundHandler,
  soundOn,
  closeButtonHandler,
  showClose,
  avatarSelected,
  onClickExplore,
  buttons,
}) => {

  const [play, { stop, sound }] = useSound(theme)
  useEffect(() => {
    if (sound) {
      sound.loop = true
    }
  }, [sound])

  console.log({ sound })

  if (soundOn) {
    play()
  } else {
    stop()
  }

  return (
    <Fragment>
      <div
        className={
          selectedIndex === 1
            ? classes.buttonContainer
            : clsx(classes.notSelected, classes.buttonContainer)
        }
      >
        {!avatarSelected && (
          <Button
            onClick={informationButtonHandler}
            classes={{
              root: selectedIndex === 1 ? classes.rootSelected : classes.root,
            }}
            variant="outlined"
          >
            {buttons.information}
          </Button>
        )}
      </div>
      <div
        className={
          selectedIndex === 2
            ? classes.buttonContainer
            : clsx(classes.notSelected, classes.buttonContainer)
        }
      >
        {!avatarSelected && (
          <Button
            onClick={linksButtonHandler}
            classes={{
              root: selectedIndex === 2 ? classes.rootSelected : classes.root,
            }}
            variant="outlined"
          >
            {buttons.subscribe}
          </Button>
        )}
      </div>
      <div className={clsx(classes.buttonContainer, classes.soundButton)}>
        <Button onClick={soundHandler} classes={{ root: classes.root }} variant="outlined">
          {soundOn ? buttons.soundOff : buttons.soundOn}
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
      {!showClose && (
        <div className={classes.exploreButtonContainer}>
          <Button
            onClick={() => onClickExplore()}
            classes={{ root: classes.exploreButton }}
            variant="outlined"
          >
            {buttons.explore}
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
