import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  setSubscriptionText,
  setInformationText,
  setSuccessfullySubscribedText,
  setCreditLinks,
} from '../../../redux/Text/actions'

const WithSidebarText = props => {
  const {
    setSubscriptionText,
    setInformationText,
    setSuccessfullySubscribedText,
    setCreditLinks,
  } = props

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://138.68.65.237/api/texts`)
      const data = await response.json()

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
})

export default connect(
  null,
  mapDispatchToProps,
)(WithSidebarText)
