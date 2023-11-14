import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginReg from "./container/LoginReg.jsx";
import {useState} from "react";
import SnackbarAlert from "./components/SnackbarAlert.jsx";
import {AlertProvider} from "./components/AlertContext.jsx";
import Shop from "./container/shop.jsx";
import Inventory from "./container/inventory.jsx";
import RemainingOrders from "./container/remainingOrders.jsx";
import ToDeliver from "./container/toDeliver.jsx";
import AllOrders from "./container/allOrders.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Orders from './container/orders.jsx';
import Cart from './container/cart.jsx';
import AccountDetails from './container/accountDetails.jsx';
import Users from './container/users.jsx';
import NotFound404 from './components/404.jsx';

export default function App() {
    const [alertStatus, setAlertStatus] = useState({type:'success',message:'',open:false});

    const showAlert = (message,type) => {
        setAlertStatus({type:type, message:message, open:true});
    }

    return (
        <>
            <AlertProvider value={showAlert}>
                <SnackbarAlert alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginReg/>}/>
                        <Route path="/" element={<ProtectedRoute element={<Shop/>} roles={['CUSTOMER']}/>}/>
                        <Route path='/account' element={<ProtectedRoute element={<AccountDetails/>} roles={['CUSTOMER','ADMIN','DELIVERY']}/>}/>
                        <Route path='/inventory' element={<ProtectedRoute element={<Inventory/>} roles={['ADMIN']}/>}/>
                        <Route path='/remainingOrders' element={<ProtectedRoute element={<RemainingOrders/>} roles={['ADMIN']}/>}/>
                        <Route path='/toDeliver' element={<ProtectedRoute element={<ToDeliver/>} roles={['DELIVERY']}/>}/>
                        <Route path='/allOrders' element={<ProtectedRoute element={<AllOrders/>} roles={['ADMIN']}/>}/>
                        <Route path='/orders' element={<ProtectedRoute element={<Orders/>} roles={['CUSTOMER']}/>}/>
                        <Route path='/cart' element={<ProtectedRoute element={<Cart/>} roles={['CUSTOMER']}/>}/>
                        <Route path='/allUsers' element={<ProtectedRoute element={<Users/>} roles={['ADMIN']}/>}/>
                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
            </AlertProvider>
        </>
    );
}
