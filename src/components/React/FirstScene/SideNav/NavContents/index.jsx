import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

import marked from 'marked'

const useStyles = makeStyles({
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
    padding: '5px',
    width: '90%',
  },
  input: {
    paddingRight: '10px',
    outline: 'none',
    border: 'none',
    background: 'black',
    borderRadius: '15px',
    color: 'red',
    fontWeight: 'bold',
    padding: '5px',
    width: '80%'
  },
  buttonContainer: {
    position: 'absolute',
    right: '2px'
  },
  button: {
    background: 'red',
    color: 'black',
    height: '20px',
    fontSize: '11px',
    borderRadius: '15px',
    padding: '0',
    fontWeight: 'bold'
  }
})

const getMarkdownText = text => {
  var rawMarkup = marked(text, { sanitize: true })
  return { __html: rawMarkup }
}

const CustomForm = () => {
  const [email, setEmail] = useState('')

  const classes = useStyles()

  return (
    <MailchimpSubscribe
      url="https://hotmail.us7.list-manage.com/subscribe/post?u=64d719b099a1f7d2780a263f4&amp;id=86753ee802"
      render={({ subscribe, status, message }) => (
        <div>
          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className={classes.buttonContainer}>
              <Button classes={{ root: classes.button }} variant="contained" onClick={() => subscribe({ EMAIL: email })}>
                SIGN-UP
              </Button>
            </div>
            {/* <button className={classes.button} onClick={() => subscribe({ EMAIL: email })}>submit</button> */}
          </div>
          {status === 'sending' && <div style={{ color: 'blue' }}>sending...</div>}
          {status === 'error' && (
            <div style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: message }} />
          )}
          {status === 'success' && <div style={{ color: 'green' }}>Subscribed !</div>}
        </div>
      )}
    />
  )
}

const NavContents = props => {
  const { informationText, subscriptionText, selectedIndex } = props
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {selectedIndex === 1 && <div dangerouslySetInnerHTML={getMarkdownText(informationText)} />}
      {selectedIndex === 2 && <div dangerouslySetInnerHTML={getMarkdownText(subscriptionText)} />}
      <CustomForm />
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
