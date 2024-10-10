import React, { useContext } from 'react'

import { AuthContext } from '../contexts/AuthContext'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

const Routes = () => {

    const { user } = useContext(AuthContext)

    return (
        user ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes