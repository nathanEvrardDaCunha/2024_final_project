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
import UpdateLocation from "./pages/UpdateLocations.tsx";
import MembershipPage from "./pages/MembershipPage.tsx";
import LocationDetails from "./pages/LocationDetails.tsx";
import ManageSubscription from "./pages/ManageSubscription.tsx";
import RentorReservations from "./pages/RentorReservations.tsx";
import NotFound from "./pages/NotFound.tsx";
import UserReservations from "./pages/UserReservations.tsx";
import ServiceList from "./components/common/ServiceList.tsx";
import ReservationServices from "./components/ReservationServices.tsx";
import LocationFinances from "./pages/LocationFinances.tsx"; // Add this import

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/membership" element={<MembershipPage />} />
                    <Route path="/manage-subscription" element={<ManageSubscription />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/estimate" element={<EstimateLocation />} />
                    <Route path="/success" element={<SuccesPageRenter />} />
                    <Route path="/canceled" element={<CanceledPageRenter />} />
                    <Route path="/admin/locations" element={<AdminLocations />} />
                    <Route path="/admin/locations/:locationId/review" element={<AdminLocationsReview />} />
                    <Route path="/locations/pending-publish" element={<PendingPublishLocations />} />
                    <Route path="/locations/:locationId/publish" element={<PublishLocation />} />
                    <Route path="/locations/:locationId/update" element={<UpdateLocation />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/locations" element={<PublishedLocations />} />
                    <Route path="/my-published-locations" element={<UserPublishedLocations />} />
                    <Route path="/locations/:id" element={<LocationDetails />} />
                    <Route path="/locations/:id/finances" element={<LocationFinances />} />
                    <Route path="/locations/:id/rentor-reservations" element={<RentorReservations />} />
                    <Route path="/my-reservations" element={<UserReservations />} />
                    <Route path="/services" element={<ServiceList />} />
                    <Route path="/reservations/:reservationId/services" element={<ReservationServices />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;