import React from 'react';
import './Login.css';
import { loginUrl } from './spotify';

function Login() {
  return (
    <div className="login">
       <h2 className="login-logo">Tune<span>Coder</span></h2>
       <img className = 'login__image' src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWFycGhvbmVzfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
       <a href={loginUrl}>Login with Spotify</a>
    </div>
  )
}

export default Login;