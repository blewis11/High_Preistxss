import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

const useStyles = makeStyles({
  container: {
    padding: '15px',
    lineHeight: '2',
  },
})

const NavContents = props => {
  const { informationText, subscriptionText, selectedIndex } = props
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {selectedIndex === 1 && <div>{informationText}</div>}
      {selectedIndex === 2 && <div>{subscriptionText}</div>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    informationText: state.text.informationText,
    subscriptionText: state.text.subscriptionText,
  }
}

export default connect(mapStateToProps)(NavContents)
