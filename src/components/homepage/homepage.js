import React from 'react';
import { Signin } from '../signin/signin';
import { Body } from './body/body';
import './homepage.scss';

export const Homepage = () => {
    return (
        <>
        <Signin />
        <Body />
        </>
    );
  }