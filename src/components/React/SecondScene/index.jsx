import { makeStyles, Fade } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SideNav } from './SideNav/index.jsx'
import { TopNavButtons } from './TopNavButtons/index.jsx'

const useStyles = makeStyles({
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
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})

const Fadeout = ({ sceneNumber }) => {
  const [fadeout, setFadeout] = useState(false)
  useEffect(() => {
    window.setTimeout(() => {
      setFadeout(true)
    }, 500)
  }, [sceneNumber])

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
      opacity: fadeout ? 0 : 1,
      transition: 'opacity 1s',
      pointerEvents: 'none',
    },
  })

  const classes = useStyles()

  return <div className={classes.container} />
}

const SecondScene = ({ sceneNumber }) => {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showCredits, setShowCredits] = useState(false)

  const classes = useStyles()

  const informationHandler = () => {
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

  return (
    <div className="sidebarContainer">
      <Fadeout sceneNumber={sceneNumber} />
      <TopNavButtons
        selectedIndex={selectedIndex}
        buttonColor={'white'}
        informationButtonHandler={informationHandler}
        linksButtonHandler={linksHandler}
        soundButtonHandler={() => {}}
        inSubscribedState={false}
      />
      <SideNav
        open={open}
        setOpen={setOpen}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        showCredits={showCredits}
        setShowCredits={setShowCredits}
      />

      <div className={classes.credits} onClick={onClickCredits}>
        CREDITS
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    sceneNumber: state.state.sceneNumber,
  }
}

export default connect(mapStateToProps)(SecondScene)
