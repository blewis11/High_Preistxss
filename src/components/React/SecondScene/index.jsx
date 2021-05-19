import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const SecondScene = ({ sceneNumber }) => {
    const [fadeout, setFadeout] = useState(false)
    useEffect(() => {
        window.setTimeout(() => {
            setFadeout(true)
        }, 500)
    }, [sceneNumber])

    const useStyles = makeStyles({
        container: {
            width: '100vw',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 'auto',
            zIndex: 5000,
            backgroundColor: '#3416DC',
            opacity: fadeout ? 0 : 1,
            transition: 'opacity 1s',
            pointerEvents: 'none'
        },
    })

    const classes = useStyles()

    return <div className={classes.container} />

}

const mapStateToProps = state => {
    return {
        sceneNumber: state.state.sceneNumber,
    }
}

export default connect(mapStateToProps)(SecondScene)
