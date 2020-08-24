import React from 'react'
import { useHistory } from 'react-router-dom'

const Logout = () => {
    const history = useHistory()
    const onClick = () => {
        localStorage.removeItem("AuthToken")
        history.push("/")
    }

    return (
        <>
            <div onClick={onClick}>Logout</div>
        </>
    )
}

export default Logout