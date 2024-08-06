import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import EstimateLocation from "./pages/EstimateLocation";
import SuccesPageRenter from "./pages/SuccessPageRenter.tsx";
import CanceledPageRenter from "./pages/CanceledPageRenter.tsx";
import AdminLocations from "./pages/AdminLocations";
import AdminLocationsReview from "./pages/AdminLocationsReview.ts.tsx";
import PendingPublishLocations from "./pages/PendingPublishLocations.tsx";
import PublishLocation from "./pages/PublishLocations.tsx";
import UserManagement from "./pages/UserManagement.tsx";
import PublishedLocations from "./pages/PublishedLocations.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserPublishedLocations from "./pages/UserPublishedLocation.tsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/estimate" element={<EstimateLocation />} />
                    <Route path="/success" element={<SuccesPageRenter />} />
                    <Route path="/canceled" element={<CanceledPageRenter />} />
                    <Route path="/admin/locations" element={<AdminLocations />} />
                    <Route path="/admin/locations/:locationId/review" element={<AdminLocationsReview />} />
                    <Route path="/locations/pending-publish" element={<PendingPublishLocations />} />
                    <Route path="/locations/:locationId/publish" element={<PublishLocation />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/locations" element={<PublishedLocations />} />
                    <Route path="/my-published-locations" element={<UserPublishedLocations />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;