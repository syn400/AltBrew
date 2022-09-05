import React from 'react';

export const Signin = () => {
    return (
    <>
        <div className="bg">
          <span className="bg-1"></span>
          <span className="bg-2" id="user-menu">
              <form className="show-user-menu-form" id="signInForm">
                  <input type="text" id="login" placeholder="Username" autoComplete="username"/>
                  <input type="password" id="password" placeholder="Password" autoComplete="current-password"/>
                  <div>
                      <a href='/register' id="register">Register</a>
                      or
                  </div>
                  <input type="submit" id="sign-in" value="Sign In"/>
              </form>
          </span>
          <span className="bg-3"></span>
          <span className="bg-4"></span>
        </div>
        <i className="fa-solid fa-circle-user" id="user-menu-btn"/>
        </>
    );
  }