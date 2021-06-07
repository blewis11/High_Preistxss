import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import TopNavButtons from '../TopNavButtons/index.jsx'
import NavContents from '../NavContents/index.jsx'
import Credits from './Credits/index.jsx'

const SideNav = ({
  open,
  setOpen,
  selectedIndex,
  setSelectedIndex,
  showCredits,
  setShowCredits,
  selectedAvatar,
  setAvatarSelected,
  avatarSelected,
  setShowAvatarButtons,
  showAvatarButtons,
  onClickAvatarButton,
  setSelectedAvatar,
}) => {
  const useStyles = makeStyles(theme => ({
    innerDrawer: {
      width: '31.25vw',
      minWidth: '400px',
      maxWidth: '600px',
      overflowX: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        width: '100vw',
        minWidth: '100vw',
        maxWidth: '100vw',
      },
    },
    paper: {
      backgroundColor: '#121212',
      boxShadow: 'none',
    },
    credits: {
      width: '100%',
      backgroundColor: '#121212',
      color: '#9489de',
      textDecoration: showCredits ? 'underline' : 'underline solid transparent',
      padding: '0 15px 15px 15px',
      fontSize: '10px',
      textTransform: 'uppercase',
      fontFamily: 'Helvetica Neue LT W05_75 Bold',
      letterSpacing: '0.06em',
      lineHeight: 1,
      marginTop: 'auto',
      cursor: 'pointer',
      transition: 'text-decoration 0.3s ease',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }))

  const classes = useStyles()

  const onClose = () => {
    setOpen(false)
    window.setTimeout(() => {
      setAvatarSelected(false)
      setShowAvatarButtons(false)
    }, 200)
  }

  const informationHandler = () => {
    setShowCredits(false)
    setSelectedIndex(1)
  }

  const linksHandler = () => {
    setShowCredits(false)
    setSelectedIndex(2)
  }

  const onClickCredits = () => {
    setShowCredits(true)
    setSelectedIndex(0)
  }

  return (
    <Fragment>
      <Drawer
        open={open}
        onClose={onClose}
        BackdropProps={{ invisible: true }}
        classes={{ paper: classes.paper }}
      >
        <div className={classes.innerDrawer}>
          <TopNavButtons
            showClose
            closeButtonHandler={onClose}
            informationButtonHandler={informationHandler}
            linksButtonHandler={linksHandler}
            selectedIndex={selectedIndex}
            buttonColor={'#9489de'}
            avatarSelected={avatarSelected}
          />

          {showCredits ? (
            <Credits />
          ) : (
            <>
              <NavContents
                selectedIndex={selectedIndex}
                selectedAvatar={selectedAvatar}
                avatarSelected={avatarSelected}
                showAvatarButtons={showAvatarButtons}
                onClickAvatarButton={onClickAvatarButton}
                setAvatarSelected={setAvatarSelected}
                setSelectedAvatar={setSelectedAvatar}
              />
            </>
          )}

          {!showAvatarButtons && (
            <div className={classes.credits} onClick={onClickCredits}>
              CREDITS
            </div>
          )}
        </div>
      </Drawer>
    </Fragment>
  )
}

export { SideNav }
