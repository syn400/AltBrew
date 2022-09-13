import { React, useState } from 'react';
import { Link } from 'react-router-dom';

export const Signin = () => {

    const [toggleMenu, toggleMenuSet] = useState(false);

    return (
        <>
            <div className="bg">
                <span className="bg-1"></span>
                <i  className={toggleMenu ? "fa-solid fa-xmark" : "fa-solid fa-circle-user"} id="user-menu-btn" onClick={()=>toggleMenuSet(!toggleMenu)}/>
                <span className={toggleMenu ? 'bg-2 show-user-menu' : 'bg-2'} id="user-menu">
                    <form className="show-user-menu-form" id="signInForm">
                        <input type="text" id="login" placeholder="Username"/>
                        <input type="password" id="password" placeholder="Password"/>
                        <div>
                            <Link to='/register' id="register">Register</Link> or
                        </div>
                        <input type="submit" id="sign-in" value="Sign In"/>
                    </form>
                </span>
                <span className="bg-3"></span>
                <span className="bg-4"></span>
            </div>
        </>
    );
  }