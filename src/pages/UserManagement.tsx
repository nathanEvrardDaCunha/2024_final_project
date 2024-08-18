import React, { useEffect, useState } from 'react';import Header from "../components/layout/header/Header";import ContentBackground from "../components/layout/ContentBackground";import Footer from "../components/layout/Footer";import { getToken } from '../utils/jwt';import BigCard from '../components/common/cards/BigCard';import CardBody from '../components/common/cards/CardBody';import CardTitleCentered from '../components/common/cards/CardTitleCentered';import CardParagraph from '../components/common/cards/CardParagraph';import UserDetailManagement from "./UserDetailManagement";interface User {	id: number;	firstname: string;	lastname: string;	email: string;	status: 'ADMIN' | 'RENTER' | 'FREE' | 'BAGPACKER_MONTHLY' | 'BAGPACKER_YEARLY' | 'EXPLORATOR_MONTHLY' | 'EXPLORATOR_YEARLY' | 'BANNED_RENTER' | 'BANNED_FREE' | 'BANNED_BAGPACKER_MONTHLY' | 'BANNED_BAGPACKER_YEARLY' | 'BANNED_EXPLORATOR_MONTHLY' | 'BANNED_EXPLORATOR_YEARLY';}const UserManagement: React.FC = () => {	const [users, setUsers] = useState<User[]>([]);	const [selectedUser, setSelectedUser] = useState<User | null>(null);		useEffect(() => {		fetchUsers();	}, []);		const fetchUsers = async () => {		try {			const response = await fetch('http://localhost:3000/auth/users', {				headers: {					'Authorization': `Bearer ${getToken()}`				}			});			if (!response.ok) throw new Error('Failed to fetch users');			const data = await response.json();			setUsers(data);		} catch (error) {			console.error('Error fetching users:', error);			alert('Failed to fetch users. Please try again.');		}	};		const handleBanUser = async (userId: number) => {		try {			const response = await fetch(`http://localhost:3000/auth/users/${userId}/ban`, {				method: 'PUT',				headers: {					'Authorization': `Bearer ${getToken()}`				}			});			if (!response.ok) {				const errorData = await response.json();				throw new Error(errorData.error || 'Failed to ban user');			}			fetchUsers(); // Refresh the user list		} catch (error) {			console.error('Error banning user:', error);			alert(error instanceof Error ? error.message : 'An error occurred while banning the user');		}	};		const handleUnbanUser = async (userId: number) => {		try {			const response = await fetch(`http://localhost:3000/auth/users/${userId}/unban`, {				method: 'PUT',				headers: {					'Authorization': `Bearer ${getToken()}`				}			});			if (!response.ok) {				const errorData = await response.json();				throw new Error(errorData.error || 'Failed to unban user');			}			fetchUsers(); // Refresh the user list		} catch (error) {			console.error('Error unbanning user:', error);			alert(error instanceof Error ? error.message : 'An error occurred while unbanning the user');		}	};		const handlePromoteUser = async (userId: number) => {		try {			const response = await fetch(`http://localhost:3000/auth/users/${userId}/promote`, {				method: 'PUT',				headers: {					'Authorization': `Bearer ${getToken()}`				}			});			if (!response.ok) {				const errorData = await response.json();				throw new Error(errorData.error || 'Failed to promote user');			}			fetchUsers(); // Refresh the user list		} catch (error) {			console.error('Error promoting user:', error);			alert(error instanceof Error ? error.message : 'An error occurred while promoting the user');		}	};		const handleDeleteUser = async (userId: number) => {		if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {			try {				const response = await fetch(`http://localhost:3000/auth/users/${userId}`, {					method: 'DELETE',					headers: {						'Authorization': `Bearer ${getToken()}`					}				});				if (!response.ok) {					const errorData = await response.json();					throw new Error(errorData.error || 'Failed to delete user');				}				fetchUsers(); // Refresh the user list			} catch (error) {				console.error('Error deleting user:', error);				alert(error instanceof Error ? error.message : 'An error occurred while deleting the user');			}		}	};		const handleSelectUser = (user: User) => {		setSelectedUser(user);	};		const canBeBanned = (status: User['status']) =>		['RENTER', 'FREE', 'BAGPACKER_MONTHLY', 'BAGPACKER_YEARLY', 'EXPLORATOR_MONTHLY', 'EXPLORATOR_YEARLY'].includes(status);		const canBeUnbanned = (status: User['status']) =>		['BANNED_RENTER', 'BANNED_FREE', 'BANNED_BAGPACKER_MONTHLY', 'BANNED_BAGPACKER_YEARLY', 'BANNED_EXPLORATOR_MONTHLY', 'BANNED_EXPLORATOR_YEARLY'].includes(status);		const canBePromoted = (status: User['status']) =>		!['ADMIN', 'BANNED_RENTER', 'BANNED_FREE', 'BANNED_BAGPACKER_MONTHLY', 'BANNED_BAGPACKER_YEARLY', 'BANNED_EXPLORATOR_MONTHLY', 'BANNED_EXPLORATOR_YEARLY'].includes(status);		return (		<>			<Header />			<ContentBackground>				<div className="container mx-auto px-4">					<h1 className="text-2xl font-bold mb-4">User Management</h1>					{selectedUser ? (						<UserDetailManagement							user={selectedUser}							onClose={() => setSelectedUser(null)}							onUserUpdated={(updatedUser) => {								setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));								setSelectedUser(null);							}}						/>					) : (						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">							{users.map(user => (								<BigCard key={user.id}>									<CardBody>										<CardTitleCentered text={`${user.firstname} ${user.lastname}`} />										<CardParagraph label="Email" value={user.email} />										<CardParagraph label="Status" value={user.status} />										<div className="card-actions justify-end mt-4">											<button												onClick={() => handleSelectUser(user)}												className="btn btn-primary"											>												View Details											</button>											{canBeBanned(user.status) && (												<button													onClick={() => handleBanUser(user.id)}													className="btn btn-error"												>													Ban												</button>											)}											{canBeUnbanned(user.status) && (												<button													onClick={() => handleUnbanUser(user.id)}													className="btn btn-success"												>													Unban												</button>											)}											{canBePromoted(user.status) && (												<button													onClick={() => handlePromoteUser(user.id)}													className="btn btn-primary"												>													Promote to Admin												</button>											)}											<button												onClick={() => handleDeleteUser(user.id)}												className="btn btn-error"											>												Delete											</button>										</div>									</CardBody>								</BigCard>							))}						</div>					)}				</div>			</ContentBackground>			<Footer />		</>	);};export default UserManagement;