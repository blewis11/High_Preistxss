import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    color: '#9489DE',
    padding: '15px',
    lineHeight: '1.875',
    flex: '1 0 auto',
    flexDirection: 'column',
  },
  text: {
    fontFamily: 'Helvetica Neue LT W05_55 Roman',
    letterSpacing: '0.02em',
    lineHeight: 1.85,
    fontSize: '14px',
  },
})

const LinksSection = props => {
  return <div>in the links section</div>
}

const InformationSection = props => {
  return <div>in the information section</div>
}

const NavContents = ({ selectedIndex }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {selectedIndex === 1 && <InformationSection />}
      {selectedIndex === 2 && <LinksSection />}
    </div>
  )
}

export { NavContents }
