import React, {useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase'
import happyCoffee from '../../assets/happy-coffee.svg';
import { motion } from "framer-motion"



export const SignUp = () => {
    const nicknameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const [passwordErr, setPasswordErr] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault()
        signup(emailRef.current.value, passwordRef.current.value, passwordConfirmRef.current.value, nicknameRef.current.value);
    }

    function signup(email, password, confPassword, nickname) {

        const emailValidation = (em) => {
            return String(em)
                .toLowerCase()
                .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        }

        const passwordValidation = (pass) => {
            const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return re.test(pass)
        }

        if(nickname === '') {
            setNameErr('Enter your nickname, for example "Trevor76"')
        } else if (nickname.length < 6) {
            setNameErr('Your nickname must be longer than 6 characters')
        } else {
            setNameErr('')
        }

        if (email === '') {
            setEmailErr('Enter your email address')
        }
        else if(emailValidation(email) === null) {
            setEmailErr('Email incorrect')
        } else {
            setEmailErr('')
        }

        if (password !== confPassword) {
            setPasswordErr('Passwords should be the same')
        } else if(password === '') {
            setPasswordErr('Enter your password')
        } else if (!passwordValidation(password)) {
            setPasswordErr('Password should be 8 characters long and contain at least 1 uppercase, 1 lowercase and 1 number')
        } else {
            setPasswordErr('')
            if(passwordErr === '' && emailErr === '' && nameErr === '') {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        setIsSuccess(true)
                    })
                    .catch((error) => {
                        return error.code === 'auth/email-already-in-use' ? setEmailErr('Email already in use.') : null;
                    });
            }
        }
    }

  return (
    
    <div className="container">
        <div className="bg">
            <span className="bg-1"></span>
            <span className="bg-2"></span>
            <span className="bg-3"></span>
            <span className="bg-4"></span>
        </div>
        <motion.div 
            initial={{ opacity: .5 }}
            animate={{ opacity: 1 }} 
            className="content">
            <header className='reg-page'>
                <Link to='/'>
                    <h1 className="logo reg-page">Alt<span>BREW</span></h1>
                </Link> 
            </header>

            {isSuccess ? 
                <>
                    <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='confirmation-msg'>
                        <div>
                            <h1>Thank You!</h1>
                            <h2>Your account was created</h2>
                            <img
                            src={happyCoffee} alt="Happy coffee" />
                            <p>Check your inbox! We sent you a verification email.</p>
                            <p>If you can't find email from us - check the spam folder</p>
                        </div>
                        <Link to='/'>Back to main page</Link>
                    </motion.div>
                </>
                 :
                <form className='reg-form'> 
                    <label for='nickname'>Nickname</label>
                    <input name='nickname' style={{background: nameErr !== '' ? '#bf1a1a36' : null}} ref={nicknameRef} onChange={()=> setNameErr('')} type='text'></input>
                    <p className='alert'>{nameErr}</p>

                    <label for='email'>Email address</label>
                    <input name='email' style={{background: emailErr !== '' ? '#bf1a1a36' : null}} ref={emailRef} onChange={()=> setEmailErr('')} type='email'></input>
                    <p className='alert'>{emailErr}</p>

                    <label for='password'>Set your password</label>
                    <input name='password' style={{background: passwordErr !== '' ? '#bf1a1a36' : null}} ref={passwordRef} onChange={()=> setPasswordErr('')} type='password'></input>
                    <p className='alert'>{passwordErr}</p>

                    <label for='password'>Repeat password</label>
                    <input name='password' style={{background: passwordErr !== '' ? '#bf1a1a36' : null}} ref={passwordConfirmRef} type='password'></input>

                    <input type='submit' onClick={(e)=> handleSubmit(e)} value='Sign Up!'/>
                </form>
            }
        </motion.div>


        <footer>© 2022 Konrad Synowiec - syn400, Wszystkie prawa zastrzeżone.</footer> 
    </div>
  )
}