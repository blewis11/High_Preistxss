import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

const useStyles = makeStyles({
  container: {
    padding: '15px',
    fontSize: '14px',
    fontFamily: 'Helvetica Neue LT W05_55 Roman',
    letterSpacing: '0.02em',
    lineHeight: 1.85,
  },
  link: {
    color: '#121212',
    fontSize: '14px',
    fontFamily: 'Helvetica Neue LT W05_65 Medium',
    letterSpacing: '0.02em',
    lineHeight: 1.85,
    textDecoration: '#121212 solid underline',
    textDecorationSkip: 'ink',
    textShadow: '0 0 0px #121212',
    borderColor: '#121212',
    transition: 'color 0.25s ease 0s, border-color 0.25s ease 0s, text-shadow 0.25s ease 0s',
    '&:hover': {
      textShadow: '0 0 7px #121212',
      borderColor: 'transparent',
      textDecoration: 'none',
      borderStyle: 'solid',
      borderWidth: '0 0 1px 0',
    },
  },
})

const Credits = ({ credits }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>Founders</div>
      <div>
        <a className={classes.link} href={credits['claire']} target="_blank">
          Claire Yurika
        </a>{' '}
        <b>&</b>{' '}
        <a className={classes.link} href={credits['portia']} target="_blank">
          Portia Ferrari
        </a>
      </div>
      <br />

      <div>Creative & Art Direction</div>
      <div>
        <a className={classes.link} href={credits['chau']} target="_blank">
          Chau Luong
        </a>
      </div>
      <br />

      <div>Art Direction & Graphic Design</div>
      <div>
        <a className={classes.link} href={credits['sven']} target="_blank">
          Sven Herkt
        </a>
      </div>
      <br />

      <div>3D Artist</div>
      <div>
        <a className={classes.link} href={credits['sarah']} target="_blank">
          Sarah Ann Banks
        </a>
      </div>
      <br />

      <div>Development</div>
      <div>
        <a className={classes.link} href={credits['bejal']} target="_blank">
          Bejal Lewis
        </a>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    credits: state.text.credits,
  }
}

export default connect(mapStateToProps)(Credits)
