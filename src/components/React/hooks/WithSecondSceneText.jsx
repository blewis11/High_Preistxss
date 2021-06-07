import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  setLinksSection,
  setWisdomSection,
  setJoySection,
  setHealthSection,
  setGrowthSection,
  setExchangeSection,
  setInformationText,
  setSubscriptionText,
  setButtonsText,
} from '../../../redux/Text/actions'
import { LessDepth } from 'three'

const WithSecondSceneText = ({
  setLinksSection,
  setWisdomSection,
  setJoySection,
  setHealthSection,
  setGrowthSection,
  setExchangeSection,
  setInformationText,
  setSubscriptionText,
  setButtonsText,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://46.101.9.88/api/texts`)
      const responseButtons = await fetch(`http://46.101.9.88/api/buttons`)
      const data = await response.json()
      const buttons = await responseButtons.json()

      const buttonsText = {}

      const informationButtonText = buttons.filter(button => button.name === 'Information')

      const subscribeButtonText = buttons.filter(button => button.name === 'Subscribe')

      const onlineShopButtonText = buttons.filter(button => button.name === 'Online Shop')
      const patreonButtonText = buttons.filter(button => button.name === 'Patreon')
      const youtubeButtonText = buttons.filter(button => button.name === 'Youtube')

      const wisdomButton1Text = buttons.filter(button => button.name === 'WisdomButton1')
      const wisdomButton2Text = buttons.filter(button => button.name === 'WisdomButton2')
      const wisdomButton3Text = buttons.filter(button => button.name === 'WisdomButton3')

      const instagramButtonText = buttons.filter(button => button.name === 'Instagram')

      const joyButton1Text = buttons.filter(button => button.name === 'JoyButton1')

      const growthButton1Text = buttons.filter(button => button.name === 'GrowthButton1')

      const exchangeButton1Text = buttons.filter(button => button.name === 'ExchangeButton1')

      const exploreButtonText = buttons.filter(button => button.name === 'Explore')

      const soundOffButtonText = buttons.filter(button => button.name === 'Sound Off')

      const soundOnButtonText = buttons.filter(button => button.name === 'Sound On')

      if (soundOffButtonText.length) {
        buttonsText['soundOff'] = soundOffButtonText[0].value
      }

      if (soundOnButtonText.length) {
        buttonsText['soundOn'] = soundOnButtonText[0].value
      }

      if (exploreButtonText.length) {
        buttonsText['explore'] = exploreButtonText[0].value
      }

      if (informationButtonText.length) {
        buttonsText['information'] = informationButtonText[0].value
      }

      if (subscribeButtonText.length) {
        buttonsText['subscribe'] = subscribeButtonText[0].value
      }

      if (instagramButtonText.length) {
        buttonsText['instagram'] = instagramButtonText[0].value
      }

      if (onlineShopButtonText.length) {
        buttonsText['onlineShop'] = onlineShopButtonText[0].value
      }

      if (patreonButtonText.length) {
        buttonsText['patreon'] = patreonButtonText[0].value
      }

      if (youtubeButtonText.length) {
        buttonsText['youtube'] = youtubeButtonText[0].value
      }

      if (wisdomButton1Text.length) {
        buttonsText['wisdom1'] = wisdomButton1Text[0].value
      }

      if (wisdomButton2Text.length) {
        buttonsText['wisdom2'] = wisdomButton2Text[0].value
      }

      if (wisdomButton3Text.length) {
        buttonsText['wisdom3'] = wisdomButton3Text[0].value
      }

      if (joyButton1Text.length) {
        buttonsText['joy1'] = joyButton1Text[0].value
      }

      if (growthButton1Text.length) {
        buttonsText['growth1'] = growthButton1Text[0].value
      }

      if (exchangeButton1Text.length) {
        buttonsText['exchange1'] = exchangeButton1Text[0].value
      }

      const healthAudioLink = data.filter(text => text.name === 'HealthAudioLink')[0].content

      const healthText = data.filter(text => text.name === 'HealthText')[0].content
      const joyText = data.filter(text => text.name === 'JoyText')[0].content
      const wisdomText = data.filter(text => text.name === 'WisdomText')[0].content
      const exchangeText = data.filter(text => text.name === 'ExchangeText')[0].content
      const growthText = data.filter(text => text.name === 'GrowthText')[0].content
      const subscriptionText = data.filter(text => text.name === 'SubscriptionInfo')[0].content
      const informationText = data.filter(text => text.name === 'Information')[0].content

      setLinksSection({
        buttons: {
          instagram: buttonsText['instagram'],
          youtube: buttonsText['youtube'],
          patreon: buttonsText['patreon'],
          onlineShop: buttonsText['onlineShop'],
        },
        links: {
          instagram: '',
          youtube: '',
          patreon: '',
          onlineShop: '',
        },
      })

      setWisdomSection({
        text: wisdomText,
        buttons: {
          button1: buttonsText['wisdom1'],
          button2: buttonsText['wisdom2'],
          button3: buttonsText['wisdom3'],
        },
        links: {
          button1: '',
          button2: '',
          button3: '',
        },
      })

      setJoySection({
        text: joyText,
        buttons: {
          button1: buttonsText['joy1'],
        },
        links: {
          button1: '',
        },
      })

      setHealthSection({
        text: healthText,
        links: {
          soundcloud: healthAudioLink,
        },
      })

      setGrowthSection({
        text: growthText,
        buttons: {
          button1: buttonsText['growth1'],
        },
        links: {
          button1: '',
        },
      })

      setExchangeSection({
        text: exchangeText,
        buttons: {
          button1: buttonsText['exchange1'],
        },
        links: {
          button1: '',
        },
      })

      setInformationText(informationText)
      setSubscriptionText(subscriptionText)
      setButtonsText({
        subscribe: buttonsText['subscribe'],
        information: buttonsText['information'],
        instagram: buttonsText['instagram'],
        explore: buttonsText['explore'],
        soundOff: buttonsText['soundOff'],
        soundOn: buttonsText['soundOn'],
      })
    }

    fetchData()
  })

  return null
}

const mapDispatchToProps = dispatch => ({
  setLinksSection: values => {
    dispatch(setLinksSection(values))
  },
  setWisdomSection: values => {
    dispatch(setWisdomSection(values))
  },
  setJoySection: values => {
    dispatch(setJoySection(values))
  },
  setHealthSection: values => {
    dispatch(setHealthSection(values))
  },
  setGrowthSection: values => {
    dispatch(setGrowthSection(values))
  },
  setExchangeSection: values => {
    dispatch(setExchangeSection(values))
  },
  setInformationText: values => {
    dispatch(setInformationText(values))
  },
  setSubscriptionText: text => {
    dispatch(setSubscriptionText(text))
  },
  setButtonsText: buttons => {
    dispatch(setButtonsText(buttons))
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(WithSecondSceneText)
