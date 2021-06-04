import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Zoom from '@material-ui/core/Zoom'
import Button from '@material-ui/core/Button'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

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
      top: '1px',
      position: 'absolute',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: '100%',
      fontSize: '10px',
      margin: 'auto',
      textAlign: 'center',
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
        width: status === 'sent' ? 'calc(100% - 10px)' : '73px',
        position: 'absolute',
        right: 0,
        top: '25px',
        border: 0,
        boxSizing: 'border-box',
        borderRadius: '50px',
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
        border: '1px solid #9489dd',
        color: '#121212',
        height: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
        top: '25px' /* Important for positioning in Center */,
        left: 0 /* Important for positioning in Center */,
        boxSizing: 'border-box',
        position: 'absolute',
        '&::placeholder': {
          color: '#605A8C !important',
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
        width: '100%',
        height: '32px',
        minHeight: '20px',
        maxHeight: '10vh',
        position: 'relative',
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
      sending: {
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        ...rootStatusStyles,
      },
      sendingDone: {
        opacity: '0 !important',
        transform: 'translateY(-10px) !important',
      },
      success: {
        opacity: 0,
        transform: 'translateY(10px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        ...rootStatusStyles,
      },
      successDone: {
        opacity: '1 !important',
        transform: 'translateY(0) !important',
      },
      error: {
        opacity: 0,
        transform: 'translateY(10px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        ...rootStatusStyles,
      },
      errorDone: {
        opacity: '1 !important',
        transform: 'translateY(0) !important',
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

  const timeout = { appear: 300, enter: 1000, exit: 0 }

  return (
    <MailchimpSubscribe
      url="https://thehighpriestxss.us7.list-manage.com/subscribe/post?u=55503faf011da24b14c76cbea&amp;id=2dee189105"
      render={({ subscribe, status, message }) => (
        <Fragment>
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
              placeholder="SIGN UP FOR ACCESS"
            />
            <Zoom in={validEmail}>
              <div
                onClick={() => callSubscribe(subscribe)}
                type="submit"
                name="subscribe"
                className={classes.newsletterSubmit}
              >
                {status === null ? (
                  <div className={classes.pending}>{getButtonText(null)}</div>
                ) : (
                  <Fragment>
                    <div
                      className={classnames({
                        [classes.sending]: true,
                        [classes.sendingDone]: status !== 'sending',
                      })}
                    >
                      {getButtonText('sending')}
                    </div>
                    <div
                      className={classnames({
                        [classes.success]: true,
                        [classes.successDone]: status === 'success',
                      })}
                    >
                      {getButtonText('success')}
                    </div>
                    <div
                      className={classnames({
                        [classes.error]: true,
                        [classes.errorDone]: status === 'error',
                      })}
                    >
                      {getButtonText('error')}
                    </div>
                  </Fragment>
                )}
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
        </Fragment>
      )}
    />
  )
}

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
  button: {
    zIndex: '1 !important',
    width: '100%',
    transition: 'all 0.3s ease',
    fontFamily: 'Helvetica Neue LT W05_75 Bold',
    color: '#9489de',
    borderRadius: 15,
    border: `0.5px solid #9489de`,
    fontSize: '10px',
    letterSpacing: '0.06em',
    filter: 'none',
    padding: '7px',
    '&:hover': {
      backgroundColor: '#9489de',
      color: '#121212',
    },
  },
  buttonContainer: {
    padding: '10px 0 10px 0',
  },
})

const LinksSection = props => {
  const classes = useStyles()

  return (
    <div className={classes.text}>
      Visit our online shop to book in-depth readings, personal coaching and buy products like our
      essential oils. Subscribe to our Patreon to join the community, share knowledge and trade
      techniques. Sign-up to our newsletter to receive monthly updates of Astrological and Tarot
      guidance, and resources to help you transform your life!
      <div style={{ paddingTop: '20px', paddingBottom: '10px' }}>
        <Button
          onClick={() => { }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          INSTAGRAM
        </Button>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => { }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          YOUTUBE
        </Button>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => { }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          PATREON
        </Button>
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Button
          onClick={() => { }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          ONLINE SHOP
        </Button>
      </div>
      <SubscribeForm classes={classes} />
    </div>
  )
}

const InformationSection = props => {
  const classes = useStyles()

  return (
    <div className={classes.text}>
      Bouche is a young Kombucha brewery, created in the joint studios of our artists’ collective in
      Berlin-Pankow. The project started as a friendly collaboration but soon grew into a small
      production company. Today we are proud to finally share our passion for the craft of brewing.
      In the development of our kombucha, we place particular emphasis on developing a unique
      aromatic diversity by creating distinctive taste profiles. With every sip you can taste the
      complex interaction between tea, bacterial cultures, and yeasts. Throughout the brewing
      process, a key focus is on exploring new flavors by experimenting with different yeast and hop
      varieties in combination with carefully selected ingredients. We do not add industrially
      produced concentrates to our Kombucha, but develop our own starter cultures and original
      flavors along with our own innovative brewing techniques.
    </div>
  )
}


const WisdomSection = () => {
  const classes = useStyles()
  return <div className={classes.text}>wisdom</div>
}

const JoySection = () => {
  const classes = useStyles()
  return <div className={classes.text}>joy</div>
}

const ExchangeSection = () => {
  const classes = useStyles()
  return <div className={classes.text}>exchange</div>
}

const GrowthSection = () => {
  const classes = useStyles()
  return <div className={classes.text}>growth</div>
}

const HealthSection = () => {
  const classes = useStyles()
  return <div className={classes.text}>health</div>
}


const NavContents = ({ selectedIndex, selectedAvatar }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {
        (selectedAvatar !== 'none' && selectedAvatar !== 'default') ? (
          <div >
            {selectedAvatar === 'wisdom' && <WisdomSection />}
            {selectedAvatar === 'joy' && <JoySection />}
            {selectedAvatar === 'exchange' && <ExchangeSection />}
            {selectedAvatar === 'growth' && <GrowthSection />}
            {selectedAvatar === 'health' && <HealthSection />}
          </div>) : (
          <div>
            { selectedIndex === 1 && <InformationSection />}
            { selectedIndex === 2 && <LinksSection />}
          </div>
        )
      }

    </div>
  )
}

export { NavContents }
