import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

import marked from 'marked'

const useStyles = makeStyles({
  customFormContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    padding: '15px',
    lineHeight: '2',
  },
  inputContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    background: 'black',
    borderRadius: '15px',
    padding: '4px',
    width: '90%',
  },
  input: {
    paddingRight: '10px',
    paddingLeft: '5px',
    outline: 'none',
    border: 'none',
    background: 'black',
    borderRadius: '15px',
    color: 'red',
    fontWeight: 'bold',
    width: '90%',
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  buttonContainer: {
    display: 'flex',
  },
  button: {
    background: 'red',
    color: 'black',
    fontSize: '11px',
    borderRadius: '12px',
    fontWeight: 'bold',
    padding: '5px',
  },
  buttonlabel: {
    padding: '0 5px 0 5px',
  },
  signUpButton: {
    position: 'absolute',
    borderRadius: '15px',
    width: '90%',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '11px',
    padding: '7px 0 6px 10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover, &:focus': {
      background: 'black',
      color: 'red',
    },
  },
  statusContainer: {
    top: '35px',
    position: 'relative',
    fontSize: '11px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
})

const getMarkdownText = text => {
  var rawMarkup = marked(text, { sanitize: true })
  return { __html: rawMarkup }
}

const SubscribeForm = props => {
  const { classes } = props
  const [email, setEmail] = useState('')

  const callSubscribe = subscribe => {
    subscribe({ EMAIL: email })
  }

  return (
    <MailchimpSubscribe
      url="https://hotmail.us7.list-manage.com/subscribe/post?u=64d719b099a1f7d2780a263f4&amp;id=86753ee802"
      render={({ subscribe, status, message }) => (
        <div className={classes.customFormContainer}>
          <div className={classes.inputContainer}>
            <input
              placeholder="MAIL@DOMAIN.COM"
              className={classes.input}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className={classes.buttonContainer}>
              <Button
                classes={{ root: classes.button }}
                variant="contained"
                onClick={() => callSubscribe(subscribe)}
              >
                SIGN-UP
              </Button>
            </div>
          </div>
          <div className={classes.statusContainer}>
            {status === 'sending' && <div style={{ color: 'red' }}>sending...</div>}
            {status === 'error' && (
              <div style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: message }} />
            )}
            {status === 'success' && <div style={{ color: 'red' }}>Subscribed !</div>}
          </div>
        </div>
      )}
    />
  )
}

const SubscriptionSection = props => {
  const { subscriptionText } = props

  const [showTextInput, setShowTextInput] = useState(false)

  const classes = useStyles()

  return (
    <Fragment>
      <div dangerouslySetInnerHTML={getMarkdownText(subscriptionText)} />
      {showTextInput ? (
        <SubscribeForm classes={classes} />
      ) : (
        <div className={classes.signUpButton} onClick={() => setShowTextInput(true)}>
          SIGN UP TO STAY UP TO DATE
        </div>
      )}
    </Fragment>
  )
}

const InformationSection = props => {
  const { informationText } = props

  return <div dangerouslySetInnerHTML={getMarkdownText(informationText)} />
}

const NavContents = props => {
  const { informationText, subscriptionText, selectedIndex } = props
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {selectedIndex === 1 && <InformationSection informationText={informationText} />}
      {selectedIndex === 2 && <SubscriptionSection subscriptionText={subscriptionText} />}
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
