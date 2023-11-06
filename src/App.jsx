import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginReg from "./pages/LoginReg.jsx";
import Home from "./pages/Home.jsx";
import {useState} from "react";
import SnackbarAlert from "./components/SnackbarAlert.jsx";

export default function App() {
    const [alertStatus, setAlertStatus] = useState({type:'success',message:'',open:false});

    const showAlert = (message,type) => {
        setAlertStatus({type:type, message:message, open:true});
    }

    return (
        <>
            <SnackbarAlert alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home showAlert={showAlert}/>}/>
                    <Route path="/login" element={<LoginReg showAlert={showAlert}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}
