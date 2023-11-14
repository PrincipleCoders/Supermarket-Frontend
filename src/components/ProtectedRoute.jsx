import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAlert } from './AlertContext.jsx';

const user = JSON.parse(localStorage.getItem('user'));

const ProtectedRoute = ({ element, roles, isLink = false }) => {
    const location = useLocation();
    // const showAlert = useAlert();
    const [elementToRender, setElementToRender] = useState(null);

    const getHomeOfRole = () => {
        switch (user.role) {
            case 'ADMIN':
                return '/allOrders';
            case 'DELIVERY':
                return '/toDeliver';
            case 'CUSTOMER':
                return '/';
            default:
                return '/login';
        }
    }


    useEffect(() => {
        !isLink && console.log('ProtectedRoute', location.pathname, user.role, roles);
        if (user) {
            if (roles.includes(user.role)) {
                setElementToRender(element);
            } else {
                // showAlert('You are not authorized to access this page', 'warning');
                setElementToRender(<Navigate to={getHomeOfRole()} />);
            }
        } else {
            // showAlert('Please log in to access this page', 'warning');
            setElementToRender(<Navigate to='/login' />);
        }
    }, []);

    return elementToRender;
};

export default ProtectedRoute;
