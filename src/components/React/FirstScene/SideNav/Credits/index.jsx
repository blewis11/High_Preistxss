import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
  container: {
    padding: '15px',
    fontSize: '14px',
    fontFamily: 'Helvetica Neue LT W05_55 Roman',
    letterSpacing: '0.02em',
    lineHeight: 1.85,
  },
  link: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: '14px',
    fontFamily: 'Helvetica Neue LT W05_55 Roman',
    letterSpacing: '0.02em',
    lineHeight: 1.85,
    textDecoration: '#121212 solid underline',
    textDecorationSkip: 'ink',
    textShadow: '0 0 0px #121212',
    borderColor: '#121212',
    transition: 'color 0.25s ease 0s, border-color 0.25s ease 0s, text-shadow 0.25s ease 0s',
    '&:hover': {
      textShadow: '0 0 2px #121212',
      borderColor: 'transparent',
    },
  },
})

const Credits = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>Founders</div>
      <div>
        <a className={classes.link} href="#">
          Claire Yurika Davis
        </a>{' '}
        <b>&</b>{' '}
        <a className={classes.link} href="#">
          Portia Williams
        </a>
      </div>
      <br />

      <div>Creative and Art Direction</div>
      <div>
        <a className={classes.link} href="#">
          Chau Luong
        </a>
      </div>
      <br />

      <div>Art Direction & Graphic Design</div>
      <div>
        <a className={classes.link} href="#">
          Sven Herkt
        </a>
      </div>
      <br />

      <div>3D Artist</div>
      <div>
        <a className={classes.link} href="#">
          Sarah Ann Banks
        </a>
      </div>
      <br />

      <div>Development</div>
      <div>
        <a className={classes.link} href="#">
          Bejal Lewis
        </a>
      </div>
    </div>
  )
}

export { Credits }
