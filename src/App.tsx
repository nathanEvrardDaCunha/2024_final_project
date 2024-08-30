import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import EstimateLocation from "./pages/EstimateLocation";
import SuccesPageRenter from "./pages/SuccessPageRenter";
import CanceledPageRenter from "./pages/CanceledPageRenter";
import AdminLocations from "./pages/AdminLocations";
import PendingPublishLocations from "./pages/PendingPublishLocations";
import PublishLocation from "./pages/PublishLocations";
import UserManagement from "./pages/UserManagement";
import PublishedLocations from "./pages/PublishedLocations";
import HomePage from "./pages/HomePage";
import UserPublishedLocations from "./pages/UserPublishedLocation";
import UpdateLocation from "./pages/UpdateLocations";
import MembershipPage from "./pages/MembershipPage";
import LocationDetails from "./pages/LocationDetails";
import ManageSubscription from "./pages/ManageSubscription";
import RentorReservations from "./pages/RentorReservations";
import NotFound from "./pages/NotFound";
import UserReservations from "./pages/UserReservations";
import ServiceList from "./components/common/ServiceList";
import ReservationServices from "./components/ReservationServices";
import LocationFinances from "./pages/LocationFinances";
import AssociatedServices from "./pages/AssociatedService";
import {getUserStatus} from "./utils/jwt.tsx";
import AdminLocationsReviewTs from "./pages/AdminLocationsReview.ts.tsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userStatus = getUserStatus();
    if (!userStatus || !allowedRoles.includes(userStatus)) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/membership" element={<MembershipPage />} />
                    <Route path="/locations" element={<PublishedLocations />} />
                    <Route path="/locations/:id" element={<LocationDetails />} />
                    
                    <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['RENTER', 'FREE', 'BAGPACKER_MONTHLY', 'BAGPACKER_YEARLY', 'EXPLORATOR_MONTHLY', 'EXPLORATOR_YEARLY', 'ADMIN']}><Dashboard /></ProtectedRoute>} />
                    <Route path="/services" element={<ProtectedRoute allowedRoles={['RENTER', 'FREE', 'BAGPACKER_MONTHLY', 'BAGPACKER_YEARLY', 'EXPLORATOR_MONTHLY', 'EXPLORATOR_YEARLY', 'ADMIN']}><ServiceList /></ProtectedRoute>} />
                    <Route path="/my-reservations" element={<ProtectedRoute allowedRoles={['RENTER', 'FREE', 'BAGPACKER_MONTHLY', 'BAGPACKER_YEARLY', 'EXPLORATOR_MONTHLY', 'EXPLORATOR_YEARLY']}><UserReservations /></ProtectedRoute>} />
                    
                    <Route path="/estimate" element={<ProtectedRoute allowedRoles={['RENTER']}><EstimateLocation /></ProtectedRoute>} />
                    <Route path="/my-published-locations" element={<ProtectedRoute allowedRoles={['RENTER']}><UserPublishedLocations /></ProtectedRoute>} />
                    <Route path="/locations/:id/rentor-reservations" element={<ProtectedRoute allowedRoles={['RENTER']}><RentorReservations /></ProtectedRoute>} />
                    <Route path="/locations/:id/finances" element={<ProtectedRoute allowedRoles={['RENTER']}><LocationFinances /></ProtectedRoute>} />
                    <Route path="/locations/:id/associated-services" element={<ProtectedRoute allowedRoles={['RENTER', "ADMIN"]}><AssociatedServices /></ProtectedRoute>} />
                    
                    <Route path="/manage-subscription" element={<ProtectedRoute allowedRoles={['FREE', 'BAGPACKER_MONTHLY', 'BAGPACKER_YEARLY', 'EXPLORATOR_MONTHLY', 'EXPLORATOR_YEARLY']}><ManageSubscription /></ProtectedRoute>} />
                    
                    <Route path="/admin/locations" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLocations /></ProtectedRoute>} />
                    <Route path="/admin/locations/:locationId/review" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminLocationsReviewTs /></ProtectedRoute>} />
                    <Route path="/locations/pending-publish" element={<ProtectedRoute allowedRoles={['ADMIN']}><PendingPublishLocations /></ProtectedRoute>} />
                    <Route path="/locations/:locationId/publish" element={<ProtectedRoute allowedRoles={['ADMIN']}><PublishLocation /></ProtectedRoute>} />
                    <Route path="/user-management" element={<ProtectedRoute allowedRoles={['ADMIN']}><UserManagement /></ProtectedRoute>} />
                    
                    <Route path="/success" element={<SuccesPageRenter />} />
                    <Route path="/canceled" element={<CanceledPageRenter />} />
                    <Route path="/locations/:locationId/update" element={<UpdateLocation />} />
                    <Route path="/reservations/:reservationId/services" element={<ReservationServices />} />
                    
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;