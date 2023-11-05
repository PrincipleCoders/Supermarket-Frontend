import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginReg from "./pages/LoginReg.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<LoginReg/>} />
            </Routes>
        </BrowserRouter>
    );
}
