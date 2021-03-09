import {Route, Redirect} from 'react-router-dom'
import {useSnackbar} from 'notistack'

const PrivateRoute = ({component: Component, ...rest}) => {
    const {enqueueSnackbar} = useSnackbar()

    return (
        <Route
            {...rest}
            render={props => {
                if (localStorage.getItem('idToken')) {
                    return <Component {...props} />
                } else {
                    enqueueSnackbar('Must be logged', {
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        variant: 'warning'
                    })
                    return <Redirect to='/'/>
                }
            }}
        />
    )
}

export default PrivateRoute