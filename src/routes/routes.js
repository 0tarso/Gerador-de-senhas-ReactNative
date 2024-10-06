import React, { useContext } from 'react'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'
import { AuthContext } from '../contexts/AuthContext'

const Routes = () => {

    const { user } = useContext(AuthContext)

    return (
        user ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes