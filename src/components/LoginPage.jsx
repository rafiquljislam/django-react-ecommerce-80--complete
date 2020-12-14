import Axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { domain } from '../env'

const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    const loginnow = async () => {
        await Axios({
            method: "post",
            url: `${domain}/api/login/`,
            data: {
                "username": username,
                "password": password
            }
        }).then(response => {
            console.log(response.data["token"]);
            window.localStorage.setItem('token', response.data["token"]);
            history.push("/profile/")
        }).catch(_ => {
            history.push("/login/")
        })
    }
    return (
        <div className="container">
            <h1>Login</h1>
            <div class="form-group">
                <label>Username</label>
                <input onChange={(e) => setUsername(e.target.value)} type="email" class="form-control" placeholder="Username" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" placeholder="Password" />
            </div>
            <button className="btn btn-info" onClick={loginnow}>Login</button>
        </div>
    )
}

export default LoginPage
