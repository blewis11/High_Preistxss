import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Zoom from '@material-ui/core/Zoom'
import Button from '@material-ui/core/Button'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import marked from 'marked'

import './styles.css'

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
        backgroundColor: status === 'sent' ? '#A8D1D9' : inputFocused ? '#121212' : '#9489dd',
        color: status === 'sent' ? '#121212' : inputFocused ? '#9489dd' : '#121212',
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
          backgroundColor: '#A8D1D9',
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
        backgroundColor: status === 'sent' ? '#9489dd' : 'transparent',
        border: '1px solid #9489dd',
        color: '#9489dd',
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
          borderColor: '#9489dd',
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
          backgroundColor: '#9489dd',
          color: '#121212',
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
              placeholder="NEWSLETTER SIGN-UP"
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
  bottom: {
    position: 'absolute',
    width: '92%',
    bottom: 0,
    paddingBottom: '15px',
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

const LinksSection = ({ subscriptionText, contents }) => {
  const classes = useStyles()
  return (
    <Fragment>
      <div className={'text'} dangerouslySetInnerHTML={getMarkdownText(subscriptionText)} />
      <div style={{ paddingTop: '20px', paddingBottom: '10px' }}>
        <Button
          onClick={() => {
            const win = window.open(contents.links.instagram, '_blank')
            if (win) {
              win.focus()
            }
          }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          {contents.buttons.instagram}
        </Button>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => {
            const win = window.open(contents.links.youtube, '_blank')
            if (win) {
              win.focus()
            }
          }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          {contents.buttons.youtube}
        </Button>
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Button
          onClick={() => {
            const win = window.open(contents.links.patreon, '_blank')
            if (win) {
              win.focus()
            }
          }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          {contents.buttons.patreon}
        </Button>
      </div>
      {/* <div style={{ paddingTop: '10px' }}>
        <Button
          onClick={() => {
            const win = window.open(contents.links.onlineShop, '_blank')
            if (win) {
              win.focus()
            }
          }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          {contents.buttons.onlineShop}
        </Button>
      </div> */}
      <SubscribeForm classes={classes} />
    </Fragment>
  )
}

const AvatarButtonsSection = ({ onClickAvatarButton, setAvatarSelected, setSelectedAvatar }) => {
  const classes = useStyles()

  var containerStyles = classnames({
    [classes.text]: true,
    [classes.bottom]: true,
  })

  const onClick = avatar => {
    onClickAvatarButton()
    setSelectedAvatar(avatar)
    window.setTimeout(() => {
      window.history.pushState(null, null, '/')
    }, 200)
  }

  return (
    <div className={containerStyles}>
      <div style={{ paddingTop: '20px', paddingBottom: '10px' }}>
        <Button
          onClick={() => onClick('exchange')}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          EXCHANGE
        </Button>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          onClick={e => onClick('growth')}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          GROWTH
        </Button>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => onClick('wisdom')}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          WISDOM
        </Button>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => onClick('health')}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          HEALTH
        </Button>
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Button
          onClick={() => onClick('joy')}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          JOY
        </Button>
      </div>
    </div>
  )
}

const InformationSection = ({ informationText }) => {
  const classes = useStyles()
  const scene2Markdown = getMarkdownText(informationText)

  return <div className={'text'} dangerouslySetInnerHTML={getMarkdownText(informationText)} />
}

const WisdomSection = ({ contents }) => {
  const classes = useStyles()

  return (
    <Fragment>
      <div class="title">WISDOM</div>
      <div className={'text'} dangerouslySetInnerHTML={getMarkdownText(contents.text)} />
      <div style={{ paddingTop: '20px', paddingBottom: '10px' }}>
        <Button
          onClick={() => {
            const win = window.open(contents.links.button1, '_blank')
            if (win) {
              win.focus()
            }
          }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          {contents.buttons.button1}
        </Button>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => {
            const win = window.open(contents.links.button2, '_blank')
            if (win) {
              win.focus()
            }
          }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          {contents.buttons.button2}
        </Button>
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Button
          onClick={() => {
            const win = window.open(contents.links.button3, '_blank')
            if (win) {
              win.focus()
            }
          }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          {contents.buttons.button3}
        </Button>
      </div>
      <SubscribeForm classes={classes} />
    </Fragment>
  )
}

const JoySection = ({ contents }) => {
  const classes = useStyles()
  return (
    <Fragment>
      <div class="title">JOY</div>
      <div className={'text'} dangerouslySetInnerHTML={getMarkdownText(contents.text)} />
      <div style={{ paddingTop: '30px', paddingBottom: '10px' }}>
        <Button
          onClick={() => {
            const win = window.open(
              'http://thehighpriestxss.com/api' + contents.links.button1,
              '_blank',
            )
            if (win) {
              win.focus()
            }
          }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          {contents.buttons.button1}
        </Button>
      </div>
    </Fragment>
  )
}

const ExchangeSection = ({ contents }) => {
  const classes = useStyles()
  return (
    <Fragment>
      <div class="title">EXCHANGE</div>
      <div className={'text'} dangerouslySetInnerHTML={getMarkdownText(contents.text)} />
      <div style={{ paddingTop: '30px', paddingBottom: '10px' }}>
        <Button
          onClick={() => {
            const win = window.open(contents.links.button1, '_blank')
            if (win) {
              win.focus()
            }
          }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          {contents.buttons.button1}
        </Button>
      </div>
    </Fragment>
  )
}

const GrowthSection = ({ contents }) => {
  const classes = useStyles()
  return (
    <Fragment>
      <div class="title">GROWTH</div>
      <div className={'text'} dangerouslySetInnerHTML={getMarkdownText(contents.text)} />
      {/* <div style={{ paddingTop: '30px', paddingBottom: '10px' }}>
        <Button
          onClick={() => {
            const win = window.open(contents.links.button1, '_blank')
            if (win) {
              win.focus()
            }
          }}
          classes={{
            root: classes.button,
          }}
          variant="outlined"
        >
          {contents.buttons.button1}
        </Button>
      </div> */}
    </Fragment>
  )
}

const HealthSection = ({ contents }) => {
  const classes = useStyles()
  const html = ` <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1027221937&color=%239489dd&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/are-human-resources" title="Human Resources" target="_blank" style="color: #cccccc; text-decoration: none;">Human Resources</a> · <a href="https://soundcloud.com/are-human-resources/303-is-your-destiny-child" title="303 Is Your Destiny, Child" target="_blank" style="color: #cccccc; text-decoration: none;">303 Is Your Destiny, Child</a></div>`
  return (
    <Fragment>
      <div class="title">HEALTH</div>
      <div className={'text'} dangerouslySetInnerHTML={getMarkdownText(contents.text)} />
      <div
        style={{ paddingTop: '25px' }}
        dangerouslySetInnerHTML={{ __html: contents.links.soundcloud.trim() }}
      ></div>
    </Fragment>
  )
}

const NavContents = ({
  selectedIndex,
  selectedAvatar,
  avatarSelected,
  showAvatarButtons,
  onClickAvatarButton,
  setAvatarSelected,
  setSelectedAvatar,
  wisdom,
  joy,
  health,
  growth,
  exchange,
  informationText,
  subscriptionText,
  links,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {showAvatarButtons ? (
        <AvatarButtonsSection
          onClickAvatarButton={onClickAvatarButton}
          setAvatarSelected={setAvatarSelected}
          setSelectedAvatar={setSelectedAvatar}
        />
      ) : (
        <Fragment>
          {avatarSelected ? (
            <div>
              {selectedAvatar === 'wisdom' && <WisdomSection contents={wisdom} />}
              {selectedAvatar === 'joy' && <JoySection contents={joy} />}
              {selectedAvatar === 'exchange' && <ExchangeSection contents={exchange} />}
              {selectedAvatar === 'growth' && <GrowthSection contents={growth} />}
              {selectedAvatar === 'health' && <HealthSection contents={health} />}
            </div>
          ) : (
            <Fragment>
              {selectedIndex === 1 && <InformationSection informationText={informationText} />}
              {selectedIndex === 2 && (
                <LinksSection subscriptionText={subscriptionText} contents={links} />
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wisdom: state.text.secondScene.wisdom,
    joy: state.text.secondScene.joy,
    health: state.text.secondScene.health,
    growth: state.text.secondScene.growth,
    exchange: state.text.secondScene.exchange,
    informationText: state.text.informationText,
    subscriptionText: state.text.subscriptionText,
    links: state.text.links,
  }
}

export default connect(mapStateToProps)(NavContents)
