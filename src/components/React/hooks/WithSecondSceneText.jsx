import { useEffect } from 'react'
import { connect } from 'react-redux'
// import {
//   setSubscriptionText,
//   setInformationText,
//   setSuccessfullySubscribedText,
//   setCreditLinks,
//   setButtonsText,
// } from '../../../redux/Text/actions'

const WithSecondSceneText = props => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://46.101.9.88/api/texts`)
      const responseButtons = await fetch(`http://46.101.9.88/api/buttons`)
      const data = await response.json()
      const buttons = await responseButtons.json()

      // const buttonsText = {}

      // const subscribeButtonText = buttons.filter(button => button.name === 'Subscribe')
      // const instagramButtonText = buttons.filter(button => button.name === 'Instagram')
      // const informationButtonText = buttons.filter(button => button.name === 'Information')

      // if (subscribeButtonText.length) {
      //   buttonsText['subscribe'] = subscribeButtonText[0].value
      // }

      const credits = {}
    }

    fetchData()
  })

  return null
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  null,
  mapDispatchToProps,
)(WithSecondSceneText)
