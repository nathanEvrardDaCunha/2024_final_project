import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard.tsx";
import CreateLocation from "./pages/CreateLocation.tsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/create-location" element={<CreateLocation />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;