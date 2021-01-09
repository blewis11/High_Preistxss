import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

import marked from 'marked'

const useStyles = makeStyles({
  container: {
    padding: '15px',
    lineHeight: '1.875',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontFamily: 'Helvetica Neue LT W05_55 Roman',
    letterSpacing: '0.02em',
    lineHeight: 1.85,
    fontSize: '14px',
  },
})

const getMarkdownText = text => {
  var rawMarkup = marked(text, { sanitize: true })
  return { __html: rawMarkup }
}

const SubscribeForm = props => {
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [inputFocused, setFocused] = useState(false)
  const [status, setStatus] = useState('pending')

  const callSubscribe = subscribe => {
    if (validEmail && status !== 'sent') {
      setStatus('sent')
      subscribe({ EMAIL: email })
    }
  }

  const onInputFocus = () => setFocused(true)
  const onInputBlur = () => setFocused(false)

  const onChange = e => {
    const input = e.target.value
    setEmail(input)

    if (input != '' && /^([\w-\.]+@([\w-]+\.)+[\w-]{2,12})?$/.test(input)) {
      setValidEmail(true)
    } else {
      setValidEmail(false)
    }
  }

  const useStyles = makeStyles(theme => {
    const rootStatusStyles = {
      position: 'absolute',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: '95%',
      fontSize: '10px',
    }

    return {
      text: {
        fontFamily: 'Helvetica Neue LT W05_55 Roman',
        letterSpacing: '0.02em',
        lineHeight: 1.85,
        fontSize: '14px',
      },
      customFormContainer: {
        display: 'flex',
        flexDirection: 'column',
      },
      newsletterSubmit: {
        fontSize: '13px',
        transition: 'all 0.3s ease !important',
        outline: 'none',
        textTransform: 'uppercase',
        backgroundColor: status === 'sent' ? '#ff4440' : inputFocused ? '#9489dd' : '#121212',
        color: inputFocused || status === 'sent' ? '#121212' : '#9489dd',
        fontWeight: 700,
        margin: '5px',
        height: 'calc(100% - 10px)',
        width: status === 'sent' ? 'calc(100% - 10px)' : '25%',
        padding: '0 4%',
        position: 'absolute',
        right: 0,
        top: 0,
        border: 0,
        boxSizing: 'border-box',
        borderRadius: '50px',
        textAlign: 'center',
        '&:hover': {
          backgroundColor: '#ff4440',
          color: '#121212',
          cursor: 'pointer',
        },
      },
      newsletterEmail: {
        fontSize: '12px',
        fontFamily: 'Helvetica Neue LT W05_75 Bold',
        transition: 'all 0.3s ease',
        letterSpacing: '0.06em',
        lineHeight: 1,
        padding: '10px',
        textTransform: 'uppercase',
        borderRadius: '50px',
        backgroundColor: status === 'sent' ? '#121212' : 'transparent',
        border: '1px solid #121212',
        color: '#121212',
        height: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
        top: 0 /* Important for positioning in Center */,
        left: 0 /* Important for positioning in Center */,
        boxSizing: 'border-box',
        position: 'absolute',
        '&::placeholder': {
          color: '#121212 !important',
          opacity: 0.6,
        },
        '&:focus': {
          outline: 'none',
          backgroundColor: '#121212',
          borderColor: '#121212',
          borderWidth: '1px',
          borderStyle: 'solid',
          color: '#9489dd',
          filter: 'drop-shadow(0 0 2px #121212)',
        },
        '&:hover': {
          backgroundColor: 'transparent',
          filter: 'drop-shadow(0 0 2px #121212)',
        },
        '&:hover:focus': {
          backgroundColor: '#121212',
          color: '#9489dd',
        },
      },
      newsletterBox: {
        width: '93%',
        height: '32px',
        minHeight: '20px',
        maxHeight: '10vh',
        position: 'absolute',
        borderRadius: '15px',
        [theme.breakpoints.down('xs')]: {
          width: 'calc(100vw - 30px)',
        },
      },
      statusContainer: {
        top: '55px',
        position: 'relative',
        fontSize: '11px',
        fontWeight: 'bold',
      },
      pending: {
        opacity: status === 'pending' ? 1 : 0,
        ...rootStatusStyles,
      },
      sent: {
        opacity: 0,
        ...rootStatusStyles,
      },
      success: {
        opacity: 0,
        ...rootStatusStyles,
      },
      error: {
        opacity: 0,
        ...rootStatusStyles,
      },
    }
  })

  const classes = useStyles()

  const getButtonText = status => {
    if (!status) {
      return 'Sign-Up'
    } else if (status === 'sending') {
      return 'Sending'
    } else if (status === 'success') {
      return 'Sent Successfully'
    } else {
      return 'Something went wrong..'
    }
  }

  return (
    <MailchimpSubscribe
      url="https://hotmail.us7.list-manage.com/subscribe/post?u=64d719b099a1f7d2780a263f4&amp;id=86753ee802"
      render={({ subscribe, status, message }) => (
        <div className={classes.customFormContainer}>
          <div className={classes.newsletterBox}>
            <input
              onChange={onChange}
              type="email"
              value={email}
              name="EMAIL"
              className={classes.newsletterEmail}
              onFocus={onInputFocus}
              onBlur={onInputBlur}
              onKeyDown={e => {
                if (e.key === 'Enter') callSubscribe(subscribe)
              }}
              placeholder="mail@domain.com"
            />
            <Zoom in={validEmail}>
              <div
                onClick={() => callSubscribe(subscribe)}
                type="submit"
                name="subscribe"
                className={classes.newsletterSubmit}
              >
                <div className={classes.pending}>{getButtonText(null)}</div>
                <div className={classes.sent}>{getButtonText('sending')}</div>
                <div className={classes.success}>{getButtonText('success')}</div>
                <div className={classes.error}>{getButtonText('error')}</div>
              </div>
            </Zoom>
          </div>
          <div className={classes.statusContainer}>
            {status === 'error' && (
              <div className={classes.text} dangerouslySetInnerHTML={{ __html: message }} />
            )}
            {status === 'success' && (
              <div className={classes.text} style={{ fontWeight: 'bold' }}>
                To join the community we need to confirm your email address. Please check the link
                we just sent you.
              </div>
            )}
          </div>
        </div>
      )}
    />
  )
}

const SubscribedSection = () => {
  const classes = useStyles()

  return <div className={classes.text}>Successfully Subscribed!</div>
}

const SubscriptionSection = props => {
  const { subscriptionText } = props
  const classes = useStyles()

  return (
    <Fragment>
      <div className={classes.text} dangerouslySetInnerHTML={getMarkdownText(subscriptionText)} />
      <SubscribeForm classes={classes} />
    </Fragment>
  )
}

const InformationSection = props => {
  const { informationText } = props

  const classes = useStyles()

  return <div className={classes.text} dangerouslySetInnerHTML={getMarkdownText(informationText)} />
}

const NavContents = ({ informationText, subscriptionText, selectedIndex, inSubscribedState }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {selectedIndex === 1 && <InformationSection informationText={informationText} />}
      {selectedIndex === 2 && <SubscriptionSection subscriptionText={subscriptionText} />}
      {inSubscribedState && <SubscribedSection />}
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
