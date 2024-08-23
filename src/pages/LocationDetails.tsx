import React, { useState, useEffect } from 'react';import { useParams, useNavigate } from 'react-router-dom';import { loadStripe } from '@stripe/stripe-js';import { Elements } from '@stripe/react-stripe-js';import Calendar from 'react-calendar';import 'react-calendar/dist/Calendar.css';import Header from '../components/layout/header/Header';import Footer from '../components/layout/Footer';import {PublishedLocation, Perk, Reservation, PublishedDocument} from '../types/adminLocationType';import {	getLocationById,	getLocationReservations,	createReservation,	deleteLocation,	getLocationPaperAssetDocuments} from "../hooks/adminLocationService";import { getUserStatus, getUserId } from '../utils/jwt';import PaymentForm from "../forms/PaymentForm.tsx";import DocumentModal from "../components/DocumentModal.tsx";const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);const LocationDetails: React.FC = () => {	const { id } = useParams<{ id: string }>();	const [location, setLocation] = useState<PublishedLocation | null>(null);	const [showModal, setShowModal] = useState(false);	const [reservations, setReservations] = useState<Reservation[]>([]);	const [selectedDate, setSelectedDate] = useState<Date | null>(null);	const [numberOfNights, setNumberOfNights] = useState(1);	const [numberOfPeople, setNumberOfPeople] = useState(1);	const [isLoading, setIsLoading] = useState(true);	const [error, setError] = useState<string | null>(null);	const [successMessage, setSuccessMessage] = useState<string | null>(null);	const [userStatus, setUserStatus] = useState<string | null>(null);	const [isForRentor, setIsForRentor] = useState(false);	const [isRentor, setIsRentor] = useState(false);	const [showConfirmationModal, setShowConfirmationModal] = useState(false);	const [paymentAmount, setPaymentAmount] = useState(0);	const [canDelete, setCanDelete] = useState(false);	const [showDocumentsModal, setShowDocumentsModal] = useState(false);	const [paperAssetDocuments, setPaperAssetDocuments] = useState<PublishedDocument[]>([]);	const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);	const navigate = useNavigate();		useEffect(() => {		const fetchLocationAndReservations = async () => {			if (id) {				try {					setIsLoading(true);					const fetchedLocation = await getLocationById(parseInt(id));					setLocation(fetchedLocation);					const fetchedReservations = await getLocationReservations(parseInt(id));					setReservations(fetchedReservations);					const status = getUserStatus();					setUserStatus(status);					setIsForRentor(status === 'RENTER');					const currentUserId = getUserId();					setIsRentor(currentUserId !== null && fetchedLocation.user?.id === currentUserId);										// Check if the location can be deleted					const now = new Date();					const hasNoFutureReservations = fetchedReservations.every(reservation => {						const endDate = new Date(reservation.startDate);						endDate.setDate(endDate.getDate() + reservation.numberOfNights);						return endDate < now;					});					setCanDelete(hasNoFutureReservations && (status === 'ADMIN' || isRentor));									} catch (error) {					console.error('Error fetching location data:', error);					setError('Failed to load location data. Please try again later.');				} finally {					setIsLoading(false);				}			}		};		fetchLocationAndReservations();	}, [id]);		const handleConsultDocuments = async () => {		if (!id) return;		setIsLoadingDocuments(true);		try {			const documents = await getLocationPaperAssetDocuments(parseInt(id));			setPaperAssetDocuments(documents);			setShowDocumentsModal(true);		} catch (error) {			console.error('Error fetching paper asset documents:', error);			setError('Failed to load documents. Please try again.');		} finally {			setIsLoadingDocuments(false);		}	};		const handleReserve = () => {		if (id && selectedDate && numberOfNights > 0 && numberOfPeople > 0) {			console.log('Reservation data:', {				locationId: parseInt(id),				startDate: selectedDate,				numberOfNights,				numberOfPeople,				isForRentor,			});			if (userStatus !== 'ADMIN' && userStatus !== 'RENTER') {				const amount = numberOfNights * 1.2 * (location?.pricePerNight ?? 0);				setPaymentAmount(amount);				setShowConfirmationModal(true);			} else {				proceedWithReservation();			}		} else {			console.error('Invalid reservation data');		}	};		const handleSeeAssociatedServices = () => {		navigate(`/locations/${id}/associated-services`);	};		const proceedWithReservation = async (paymentMethod: { id: string } | null = null) => {		try {			const newReservation = await createReservation({				locationId: parseInt(id!),				startDate: selectedDate!,				numberOfNights,				numberOfPeople,				isForRentor,				paymentMethodId: paymentMethod?.id			});			setReservations([...reservations, newReservation]);			setShowModal(false);			setShowConfirmationModal(false);			setSuccessMessage('Reservation created successfully!');			setTimeout(() => setSuccessMessage(null), 3000);		} catch (error) {			console.error('Failed to create reservation:', error);			setError('Failed to create reservation. Please try again.');		}	};		const handleSeeReservations = () => {		navigate(`/locations/${id}/rentor-reservations`);	};		const handleDelete = async () => {		if (window.confirm('Are you sure you want to delete this location? This action cannot be undone.')) {			try {				await deleteLocation(parseInt(id!));				navigate('/my-published-locations');			} catch (error) {				console.error('Failed to delete location:', error);				setError('Failed to delete location. Please try again.');			}		}	};		const isDateReserved = (date: Date) => {		return reservations.some(reservation => {			const startDate = new Date(reservation.startDate);			const endDate = new Date(startDate.getTime() + reservation.numberOfNights * 24 * 60 * 60 * 1000);			return date >= startDate && date < endDate;		});	};		const renderPerkIcon = (perkType: string) => {		switch (perkType) {			case 'KITCHEN': return '🍳';			case 'BATHROOM': return '🚿';			case 'WASHING_MACHINE': return '🧺';			case 'WIFI': return '📶';			case 'AIR_CONDITIONING': return '❄️';			case 'HOT_WATER': return '🚰';			case 'SMOKE_DETECTOR': return '🚭';			case 'HEATING': return '🔥';			case 'PARKING': return '🅿️';			case 'TELEVISION': return '📺';			case 'WORKSPACE': return '💼';			case 'SWIMMING_POOL': return '🏊';			default: return '✨';		}	};		const handleSeeFinances = () => {		navigate(`/locations/${id}/finances`);	};		const canSeeFinances = isRentor;		if (isLoading) {		return (			<div className="min-h-screen flex justify-center items-center">				<span className="loading loading-spinner loading-lg"></span>			</div>		);	}		if (error || !location) {		return (			<div className="min-h-screen flex justify-center items-center">				<p className="text-red-500">{error || 'Failed to load location data.'}</p>			</div>		);	}		return (		<div className="flex flex-col min-h-screen bg-base-200">			<Header />			<main className="flex-grow container mx-auto px-4 py-8">				{successMessage && (					<div className="alert alert-success shadow-lg mb-4">						<div>							<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>							<span>{successMessage}</span>						</div>					</div>				)}								<div className="card bg-base-100 shadow-xl">					<div className="card-body">						<h2 className="card-title text-3xl">{location.title}</h2>						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">							<div className="stats shadow">								<div className="stat">									<div className="stat-title">Price per night</div>									<div className="stat-value text-primary">${location.pricePerNight}</div>								</div>							</div>							<div className="stats shadow">								<div className="stat">									<div className="stat-title">Surface</div>									<div className="stat-value">{location.surfaceM2} m²</div>								</div>							</div>							<div className="stats shadow">								<div className="stat">									<div className="stat-title">Max persons</div>									<div className="stat-value">{location.maxNumberOfPerson}</div>								</div>							</div>							<div className="stats shadow">								<div className="stat">									<div className="stat-title">Country</div>									<div className="stat-value text-sm">{location.country}</div>								</div>							</div>							<div className="stats shadow">								<div className="stat">									<div className="stat-title">Street</div>									<div className="stat-value text-sm">{location.street}</div>								</div>							</div>							<div className="stats shadow">								<div className="stat">									<div className="stat-title">Type</div>									<div className="stat-value text-sm">{location.locationType}</div>								</div>							</div>							<div className="stats shadow">								<div className="stat">									<div className="stat-title">Good Type</div>									<div className="stat-value text-sm">{location.locationGoodType}</div>								</div>							</div>						</div>					</div>				</div>								<div className="card bg-base-100 shadow-xl mt-8">					<div className="card-body">						<h2 className="card-title text-2xl mb-4">Perks</h2>						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">							{location.perks && location.perks.map((perk: Perk) => (								<div key={perk.id} className="flex items-center bg-base-200 p-2 rounded-lg">									<span className="text-2xl mr-2">{renderPerkIcon(perk.perkType)}</span>									<span>{perk.perkName}</span>								</div>							))}						</div>					</div>				</div>								<div className="mt-4 space-x-4">					{userStatus !== 'ADMIN' && (						<button							className="btn btn-primary"							onClick={() => setShowModal(true)}						>							{isForRentor ? 'Rent Location' : 'Reserve Location'}						</button>					)}										{isRentor && (						<button							className="btn btn-secondary"							onClick={handleSeeReservations}						>							Manage My Reservations (Rentor)						</button>					)}										{(isRentor || userStatus === 'ADMIN') && (						<button							className="btn btn-info"							onClick={handleConsultDocuments}						>							Consult Documents						</button>					)}										{(isRentor || userStatus === 'ADMIN') && canDelete && (						<button							className="btn btn-error"							onClick={handleDelete}						>							Delete Location						</button>					)}										{canSeeFinances && (						<button							className="btn btn-info"							onClick={handleSeeFinances}						>							See Finance						</button>					)}										{userStatus === 'ADMIN' && (						<button							className="btn btn-secondary"							onClick={handleSeeAssociatedServices}						>							See Associated Services						</button>					)}				</div>								{showModal && (					<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">						<div className="bg-white p-4 rounded-lg">							<h2 className="text-2xl mb-4">{isForRentor ? 'Rent Location' : 'Reserve Location'}</h2>							<div className="mb-4">								<label className="block text-sm font-bold mb-2" htmlFor="reservation-date">									Select Date:								</label>								<Calendar									onChange={(date) => setSelectedDate(date as Date)}									value={selectedDate}									tileDisabled={({date}) => isDateReserved(date)}									id="reservation-date"								/>							</div>							<div className="mb-4">								<label className="block text-sm font-bold mb-2" htmlFor="number-of-nights">									Number of Nights:								</label>								<input									id="number-of-nights"									type="number"									value={numberOfNights}									onChange={(e) => setNumberOfNights(parseInt(e.target.value))}									className="w-full p-2 border rounded"									placeholder="Number of nights"									min="1"									max="30"								/>							</div>							<div className="mb-4">								<label className="block text-sm font-bold mb-2" htmlFor="number-of-people">									Number of People:								</label>								<input									id="number-of-people"									type="number"									value={numberOfPeople}									onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}									className="w-full p-2 border rounded"									placeholder="Number of people"									min="1"									max={location.maxNumberOfPerson}								/>							</div>							<div className="mt-4">								<button									className="btn btn-primary mr-2"									onClick={handleReserve}									disabled={!selectedDate || numberOfNights < 1 || numberOfPeople < 1}								>									Confirm {isForRentor ? 'Rental' : 'Reservation'}								</button>								<button									className="btn btn-secondary"									onClick={() => setShowModal(false)}								>									Cancel								</button>							</div>						</div>					</div>				)}								{showConfirmationModal && (					<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">						<div className="bg-white p-4 rounded-lg">							<h2 className="text-2xl mb-4">Confirm Payment</h2>							<p>To complete your reservation, you need to pay ${paymentAmount.toFixed(2)}.</p>							<Elements stripe={stripePromise}>								<PaymentForm									amount={Number(paymentAmount.toFixed(2))}									onSuccess={proceedWithReservation}									onCancel={() => setShowConfirmationModal(false)}								/>							</Elements>						</div>					</div>				)}				{showDocumentsModal && (					<DocumentModal						documents={paperAssetDocuments}						isLoading={isLoadingDocuments}						onClose={() => setShowDocumentsModal(false)}					/>				)}			</main>			<Footer />		</div>	);};export default LocationDetails;