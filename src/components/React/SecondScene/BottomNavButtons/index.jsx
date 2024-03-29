import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { setSelectedAvatar, setAvatarSelected } from '../../../../redux/Avatar/actions'

const BottomNavButtons = ({ setSelectedAvatar, selectedAvatar, avatarSelected }) => {
  const useStyles = makeStyles(theme => {
    const rootButtonStyles = {
      zIndex: '1 !important',
      transition: 'all 0.3s ease',
      fontFamily: 'Helvetica Neue LT W05_75 Bold',
      color: 'white',
      borderRadius: 15,
      border: `0.5px solid white`,
      fontSize: '10px',
      letterSpacing: '0.06em',
      filter: 'drop-shadow(0 0 2px #F4FBFF)',
      margin: '6px',
      '&:hover': {
        backgroundColor: 'white',
        color: '#9489dd',
      },
    }

    return {
      bottomButtons: {
        position: 'fixed',
        bottom: '5px',
        cursor: 'pointer',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignIitems: 'center',
        [theme.breakpoints.down('xs')]: {
          display: 'none',
        },
      },
      root: {
        ...rootButtonStyles,
      },
      rootSelected: {
        ...rootButtonStyles,
        backgroundColor: 'white',
        color: '#9489dd',
        border: rootButtonStyles.border,
      },
    }
  })

  const classes = useStyles()

  return (
    <Fragment>
      <div className={classes.bottomButtons}>
        <Button
          onClick={() => {
            setSelectedAvatar('exchange')
          }}
          classes={{
            root:
              selectedAvatar === 'exchange' && avatarSelected ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          EXCHANGE
        </Button>
        <Button
          onClick={() => {
            setSelectedAvatar('growth')
          }}
          classes={{
            root:
              selectedAvatar === 'growth' && avatarSelected ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          GROWTH
        </Button>
        <Button
          onClick={() => {
            setSelectedAvatar('wisdom')
          }}
          classes={{
            root:
              selectedAvatar === 'wisdom' && avatarSelected ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          WISDOM
        </Button>
        <Button
          onClick={() => {
            setSelectedAvatar('health')
          }}
          classes={{
            root:
              selectedAvatar === 'health' && avatarSelected ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          HEALTH
        </Button>
        <Button
          onClick={() => {
            setSelectedAvatar('joy')
          }}
          classes={{
            root: selectedAvatar === 'joy' && avatarSelected ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          JOY
        </Button>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    selectedAvatar: state.avatar.selectedAvatar,
    avatarSelected: state.avatar.avatarSelected,
  }
}

const mapDispatchToProps = dispatch => ({
  setSelectedAvatar: avatar => {
    dispatch(setSelectedAvatar(avatar))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomNavButtons)
