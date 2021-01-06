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
  title: {},
  link: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: '14px',
    fontFamily: 'Helvetica Neue LT W05_55 Roman',
    letterSpacing: '0.02em',
    lineHeight: 1.85,
    // -webkit-text-decoration: #121212 solid underline,
    textDecoration: '#121212 solid underline',
    // -webkit-text-decoration-skip: ink,
    textDecorationSkip: 'ink',
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
