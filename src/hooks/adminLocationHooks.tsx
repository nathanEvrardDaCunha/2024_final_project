import { useState, useEffect } from 'react';import { Location } from '../types/adminLocationType.tsx';import {getLocationsToReview} from "./adminLocationService.tsx";const adminLocationsHook = () => {	const [locations, setLocations] = useState<Location[]>([]);	const [isLoading, setIsLoading] = useState(true);	const [error, setError] = useState<string | null>(null);		useEffect(() => {		const fetchLocations = async () => {			try {				const fetchedLocations = await getLocationsToReview();				setLocations(fetchedLocations);			} catch (err) {				setError('Failed to fetch locations');			} finally {				setIsLoading(false);			}		};				fetchLocations();	}, []);		return { locations, isLoading, error };};export default adminLocationsHook;