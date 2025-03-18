import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteWrapper = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    return isAuthenticated ? <React.Fragment>{children}</React.Fragment> : <Navigate to="/" />;
};

export default PrivateRouteWrapper;