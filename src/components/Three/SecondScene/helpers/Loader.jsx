import { connect } from 'react-redux'
import { useProgress } from 'drei'

import { setLoading } from '../../../../redux/Avatar/actions'

const WithLoader = ({ setLoading }) => {
  const { progress } = useProgress()
  if (progress >= 99) {
    setTimeout(() => {
      setLoading(false)
    }, 2000) // kinda hacky..but progress hook seems to stop at 95% and then wait a few moments
  }

  return null
}

const mapDispatchToProps = dispatch => ({
  setLoading: loading => {
    dispatch(setLoading(loading))
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(WithLoader)
