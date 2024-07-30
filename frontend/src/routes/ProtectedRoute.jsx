import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = ({ children, roleRequired }) => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser || AuthService.isTokenExpired()) {
        return <Navigate to="/" />;
    }

    if (roleRequired && currentUser.role !== roleRequired) {
        console.log(currentUser.role)
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
