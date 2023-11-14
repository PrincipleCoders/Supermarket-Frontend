import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAlert } from './AlertContext.jsx';

const ProtectedRoute = ({ element, roles, isLink = false }) => {
    const showAlert = useAlert();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
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


    // useEffect(() => {
    //     if (!user) {
    //         showAlert('Please log in to access the page.', 'warning');
    //         setElementToRender(<Navigate to="/login" />);
    //     }
    //     else if (!roles.includes(user.role)) {
    //         if (isLink) {
    //             setElementToRender(null)
    //         }
    //         else {
    //             showAlert('You are not authorized to access the page.', 'warning');
    //             setElementToRender(<Navigate to={getHomeOfRole()}/>);
    //         }
    //     }
    //     else {
    //         setElementToRender(element);
    //     }
    // }, [location]);
    

    return element;
};

export default ProtectedRoute;
