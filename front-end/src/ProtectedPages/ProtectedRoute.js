import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 

//If user is authenticated, a protected page will show, otherwise redirect to homepage
const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
    return ( 
    <Route 
        {...rest} 
        render={(props)=> {
        if (isAuth) {
            return <Component {...rest} />
        } else {
            return (
            <Redirect to={{pathname: '/', state: { from: props.location }}} />
            );
        }
        }}
    />
    );
}

export default ProtectedRoute;