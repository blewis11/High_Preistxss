import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const BottomNavButtons = ({ selectedIndex }) => {
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
        color: rootButtonStyles.color,
        backgroundColor: rootButtonStyles.backgroundColor,
        border: rootButtonStyles.border,
      },
    }
  })

  const classes = useStyles()

  return (
    <Fragment>
      <div className={classes.bottomButtons}>
        <Button
          onClick={() => {}}
          classes={{
            root: selectedIndex === 1 ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          HEALTH
        </Button>
        <Button
          onClick={() => {}}
          classes={{
            root: selectedIndex === 2 ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          JOY
        </Button>
        <Button
          onClick={() => {}}
          classes={{
            root: selectedIndex === 3 ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          GROWTH
        </Button>
        <Button
          onClick={() => {}}
          classes={{
            root: selectedIndex === 4 ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          EXCHANGE
        </Button>
        <Button
          onClick={() => {}}
          classes={{
            root: selectedIndex === 5 ? classes.rootSelected : classes.root,
          }}
          variant="outlined"
        >
          WISDOM
        </Button>
      </div>
    </Fragment>
  )
}

export { BottomNavButtons }
