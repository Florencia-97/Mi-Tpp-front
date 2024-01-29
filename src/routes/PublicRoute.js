import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PublicRoute = ({ element, redirectTo, isAuthenticated, path, ...props }) => {
    if(!isAuthenticated()) {
        return <Route path={path} {...props}/>
    }
    return <Navigate to={redirectTo} />;
};

export default PublicRoute
