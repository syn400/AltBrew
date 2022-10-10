import React, {useRef } from 'react';
import { Link } from 'react-router-dom';
import './signup.scss';
import {useAuth} from '../../contexts/AuthContext';


export const SignUp = () => {
    const nicknameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()

    function handleSubmit(e) {
        e.preventDefault()
        signup(emailRef.current.value, passwordRef.current.value)
    }

  return (
    
    <div className="container">
        <div className="bg">
            <span className="bg-1"></span>
            <span className="bg-2"></span>
            <span className="bg-3"></span>
            <span className="bg-4"></span>
        </div>
        <div className="content">
            <header className='reg-page'>
                <Link to='/'>
                    <h1 className="logo reg-page">Alt<span>BREW</span></h1>
                </Link> 
            </header>

            <form className='reg-form'> 
                <label for='nickname'>Nickname</label>
                <input name='nickname' ref={nicknameRef} type='text'></input>

                <label for='email'>Email address</label>
                <input name='email' ref={emailRef} type='email'></input>

                <label for='password'>Set your password</label>
                <input name='password' ref={passwordRef} type='password'></input>

                <label for='password'>Repeat password</label>
                <input name='password' ref={passwordConfirmRef} type='password'></input>

                <input type='submit' onClick={(e)=> handleSubmit(e)} value='Sign Up!'/>
            </form>
        </div>


        <footer>© 2022 Konrad Synowiec - syn400, Wszystkie prawa zastrzeżone.</footer> 
    </div>
  )
}