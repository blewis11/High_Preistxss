import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  setSubscriptionText,
  setInformationText,
  setSuccessfullySubscribedText,
  setCreditLinks,
  setButtonsText,
} from '../../../redux/Text/actions'

const WithSidebarText = props => {
  const {
    setSubscriptionText,
    setInformationText,
    setSuccessfullySubscribedText,
    setCreditLinks,
    setButtonsText,
  } = props

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://46.101.9.88/api/texts`)
      const responseButtons = await fetch(`http://46.101.9.88/api/buttons`)
      const data = await response.json()
      const buttons = await responseButtons.json()

      const buttonsText = {}

      const subscribeButtonText = buttons.filter(button => button.name === 'Subscribe')
      const instagramButtonText = buttons.filter(button => button.name === 'Instagram')
      const informationButtonText = buttons.filter(button => button.name === 'Information')

      if (subscribeButtonText.length) {
        buttonsText['subscribe'] = subscribeButtonText[0].value
      }

      if (instagramButtonText.length) {
        buttonsText['instagram'] = instagramButtonText[0].value
      }

      if (informationButtonText.length) {
        buttonsText['information'] = informationButtonText[0].value
      }

      console.log({ buttonsText })
      setButtonsText(buttonsText)

      const subscriptionText = data.filter(text => text.name === 'SubscriptionInfo')
      const informationText = data.filter(text => text.name === 'Information')
      const successfullySubscribed = data.filter(text => text.name === 'SuccessfullySubscribed')
      const bejalCredits = data.filter(text => text.name === 'BejalCredits')
      const chauCredits = data.filter(text => text.name === 'ChauCredits')
      const svenCredits = data.filter(text => text.name === 'SvenCredits')
      const sarahCredits = data.filter(text => text.name === 'SarahCredits')
      const portiaCredits = data.filter(text => text.name === 'PortiaCredits')
      const claireCredits = data.filter(text => text.name === 'ClaireCredits')

      const credits = {}

      if (subscriptionText.length) setSubscriptionText(subscriptionText[0].content)
      if (informationText.length) setInformationText(informationText[0].content)
      if (successfullySubscribed.length)
        setSuccessfullySubscribedText(successfullySubscribed[0].content)
      if (bejalCredits.length) {
        credits['bejal'] = bejalCredits[0].content
      }
      if (chauCredits.length) {
        credits['chau'] = chauCredits[0].content
      }
      if (svenCredits.length) {
        credits['sven'] = svenCredits[0].content
      }
      if (sarahCredits.length) {
        credits['sarah'] = sarahCredits[0].content
      }
      if (portiaCredits.length) {
        credits['portia'] = portiaCredits[0].content
      }
      if (claireCredits.length) {
        credits['claire'] = claireCredits[0].content
      }

      //...

      setCreditLinks(credits)
    }

    fetchData()
  })

  return null
}

const mapDispatchToProps = dispatch => ({
  setSubscriptionText: text => {
    dispatch(setSubscriptionText(text))
  },
  setInformationText: text => {
    dispatch(setInformationText(text))
  },
  setSuccessfullySubscribedText: text => {
    dispatch(setSuccessfullySubscribedText(text))
  },
  setCreditLinks: credits => {
    dispatch(setCreditLinks(credits))
  },
  setButtonsText: buttons => {
    dispatch(setButtonsText(buttons))
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(WithSidebarText)
