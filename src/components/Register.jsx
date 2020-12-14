import React from 'react'

const Register = () => {
    return (
        <div className="container" >
            <h1>Login</h1>
            <div class="form-group">
                <label>Username</label>
                <input onChange={(e) => setUsername(e.target.value)} type="email" class="form-control" placeholder="Username" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" placeholder="Password" />
            </div>
        </div>
    )
}

export default Register
