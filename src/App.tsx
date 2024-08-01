import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import EstimateLocation from "./pages/EstimateLocation";
import SuccessPageRenter from "./pages/SuccessPageRenter.tsx";
import CanceledPageRenter from "./pages/CanceledPageRenter.tsx";
import AdminLocations from "./pages/AdminLocations";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/estimate" element={<EstimateLocation />} />
                    <Route path="/success" element={<SuccessPageRenter />} />
                    <Route path="/canceled" element={<CanceledPageRenter />} />
                    <Route path="/admin/locations" element={<AdminLocations />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;