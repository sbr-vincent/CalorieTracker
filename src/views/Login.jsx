import React from 'react'
import LoginButton from '../components/LoginButton'
import { useAuth0 } from '@auth0/auth0-react'
import Dashboard from './Dashboard'

const Login = () => {
    const { isLoading } = useAuth0();

    if (isLoading) return <div>Loading...</div>
    return (
        <>
            <LoginButton />
            <Dashboard />
        </>
    )
}

export default Login

