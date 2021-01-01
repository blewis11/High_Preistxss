import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import marked from 'marked'

const useStyles = makeStyles({
  container: {
    padding: '15px',
    lineHeight: '2',
  },
})

const getMarkdownText = text => {
  var rawMarkup = marked(text, { sanitize: true })
  return { __html: rawMarkup }
}

const NavContents = props => {
  const { informationText, subscriptionText, selectedIndex } = props
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {selectedIndex === 1 && <div dangerouslySetInnerHTML={getMarkdownText(informationText)} />}
      {selectedIndex === 2 && <div dangerouslySetInnerHTML={getMarkdownText(subscriptionText)} />}
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
