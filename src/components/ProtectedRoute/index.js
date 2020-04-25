import React, { Component } from 'react';
import {Route, Redirect } from 'react-router-dom';

const isAuthenticated = true;

export const ProtectedRoute =({ component: Component,...rest})=>(
    <Route {...rest} render={(props)=>isAuthenticated? <Component {...props}/> :<Redirect to="/"/>}/>
);