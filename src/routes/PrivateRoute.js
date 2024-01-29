import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, redirectTo, isAuthenticated, path, ...props }) => {
    if(!isAuthenticated()) {
        return <Navigate to={redirectTo} />;
    }
    return <Route path={path} {...props}/>
};

export default PrivateRoute
