import { makeStyles, Fade } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { SideNav } from './SideNav/index.jsx'
import { TopNavButtons } from './TopNavButtons/index.jsx'
import BottomNavButtons from './BottomNavButtons/index.jsx'
import WithSecondSceneText from '../hooks/WithSecondSceneText.jsx'
import { setAvatarSelected, setSelectedAvatar } from '../../../redux/Avatar/actions'
import './styles.css'

const useStyles = makeStyles(theme => ({
  loaderContainer: {
    zIndex: '2000 !important',
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#121212',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  credits: {
    color: '#ffffff',
    filter: 'drop-shadow(0 0 2px #F4FBFF)',
    textDecoration: 'underline solid transparent',
    padding: '15px',
    fontSize: '10px',
    textTransform: 'uppercase',
    fontFamily: 'Helvetica Neue LT W05_75 Bold',
    letterSpacing: '0.06em',
    lineHeight: 1,
    position: 'fixed',
    bottom: '5px',
    cursor: 'pointer',
    transition: 'text-decoration 0.3s ease',
    display: 'block',
    '&:hover': {
      textDecoration: 'underline',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))

const Fadeout = ({ loading }) => {
  const useStyles = makeStyles({
    container: {
      width: '100vw',
      height: '100vh',
      position: 'absolute',
      top: 0,
      left: 0,
      margin: 'auto',
      zIndex: 5000,
      backgroundColor: '#3416DC',
      opacity: loading ? 1 : 0,
      transition: 'opacity 1s',
      pointerEvents: 'none',
    },
  })

  const classes = useStyles()

  return <div className={classes.container} />
}

const IntroText = ({ loaded }) => {
  const [startFadeout, setStartFadeout] = useState(false)

  useEffect(() => {
    if (loaded) {
      window.setTimeout(() => {
        setStartFadeout(true)
      }, 10000)
    }
  }, [loaded])

  const useStyles = makeStyles({
    container: {
      opacity: startFadeout ? 0 : 1,
      transition: 'opacity 1s',
      pointerEvents: 'none',
    },
  })

  const classes = useStyles()

  let loadedStyles = classnames({
    loaded: loaded,
    [classes.container]: true,
  })

  return (
    <div id="intro-wrapper" class={loadedStyles}>
      <div id="introtext">
        <p class="line1">Take a look around…</p>
        <p class="line2">drag your screen to look further &mdash;</p>
        <p class="line3">Tap to explore</p>
      </div>
    </div>
  )
}

const SecondScene = ({
  sceneNumber,
  selectedAvatar,
  setSelectedAvatar,
  avatarSelected,
  setAvatarSelected,
  loadingSecondPage,
}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // only do this on desktop
    setOpen(avatarSelected)
  }, [avatarSelected])

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showCredits, setShowCredits] = useState(false)
  const [showAvatarButtons, setShowAvatarButtons] = useState(false)
  const [soundOn, setSoundOn] = useState(true)

  const classes = useStyles()

  const informationHandler = () => {
    setShowAvatarButtons(false)
    setShowCredits(false)
    setSelectedIndex(1)
    setOpen(true)
  }

  const linksHandler = () => {
    setShowCredits(false)
    setSelectedIndex(2)
    setOpen(true)
  }

  const onClickCredits = () => {
    setShowCredits(true)
    setSelectedIndex(0)
    setOpen(true)
  }

  const onClickExplore = () => {
    setSelectedIndex(0)
    setShowAvatarButtons(true)
    setOpen(true)
    window.history.pushState(null, null, '/explore')
  }

  const onClickAvatarButton = () => {
    setOpen(false)
    setShowAvatarButtons(false)
  }

  const soundHandler = () => {
    setSoundOn(!soundOn)
  }

  return (
    <div className="sidebarContainer">
      <WithSecondSceneText />
      <Fadeout loading={loadingSecondPage} />
      <IntroText loaded={!loadingSecondPage} />
      <TopNavButtons
        selectedIndex={selectedIndex}
        buttonColor={'white'}
        informationButtonHandler={informationHandler}
        linksButtonHandler={linksHandler}
        soundButtonHandler={() => {}}
        inSubscribedState={false}
        onClickExplore={onClickExplore}
        soundHandler={soundHandler}
        soundOn={soundOn}
      />
      <SideNav
        open={open}
        setOpen={setOpen}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        showCredits={showCredits}
        setShowCredits={setShowCredits}
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
        setAvatarSelected={setAvatarSelected}
        avatarSelected={avatarSelected}
        setShowAvatarButtons={setShowAvatarButtons}
        showAvatarButtons={showAvatarButtons}
        onClickAvatarButton={onClickAvatarButton}
      />
      <BottomNavButtons />
      <div className={classes.credits} onClick={onClickCredits}>
        CREDITS
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    sceneNumber: state.state.sceneNumber,
    selectedAvatar: state.avatar.selectedAvatar,
    avatarSelected: state.avatar.avatarSelected,
    loadingSecondPage: state.avatar.loadingSecondPage,
  }
}

const mapDispatchToProps = dispatch => ({
  setSelectedAvatar: avatar => {
    dispatch(setSelectedAvatar(avatar))
  },
  setAvatarSelected: avatar => {
    dispatch(setAvatarSelected(avatar))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SecondScene)
