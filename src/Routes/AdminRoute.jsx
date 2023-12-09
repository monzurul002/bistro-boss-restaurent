import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { isAdmin, adminLoading } = useAdmin()
    console.log(isAdmin);
    const location = useLocation();
    if (loading || adminLoading) {
        return <h1>Data Loading..</h1>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace ></Navigate>
};

export default AdminRoute;