import { useEffect } from 'react'
import { connect } from 'react-redux'
import { setSubscriptionText, setInformationText } from '../../../redux/Text/actions'

const WithSidebarText = props => {
  const { setSubscriptionText, setInformationText } = props

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://46.101.9.88/api/texts`)
      const data = await response.json()

      const subscriptionText = data.filter(text => text.name === 'SubscriptionInfo')
      const informationText = data.filter(text => text.name === 'Information')

      if (subscriptionText.length) setSubscriptionText(subscriptionText[0].content)
      if (informationText.length) setInformationText(informationText[0].content)
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
})

export default connect(
  null,
  mapDispatchToProps,
)(WithSidebarText)
