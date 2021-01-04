import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  logoContainer: {
    width: '100vw',
    position: 'fixed',
    bottom: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    filter: 'drop-shadow(0 0 2px #f4fbff)',
  },
})

const Logo = () => {
  const classes = useStyles()

  return (
    <div className={classes.logoContainer}>
      <img className={classes.image} src={'logo.svg'} height={82} />
    </div>
  )
}

export { Logo }
