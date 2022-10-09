import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.scss'


export const SignUp = () => {

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
                <input name='nickname' type='text'></input>

                <label for='email'>Email address</label>
                <input name='email' type='email'></input>

                <label for='password'>Set your password</label>
                <input name='password' type='password'></input>

                <label for='password'>Repeat password</label>
                <input name='password' type='password'></input>

                <input type='submit' value='Sign Up!'/>
            </form>
        </div>


        <footer>© 2022 Konrad Synowiec - syn400, Wszystkie prawa zastrzeżone.</footer> 
    </div>
  )
}