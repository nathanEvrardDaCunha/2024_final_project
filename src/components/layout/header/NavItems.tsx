import React from 'react';import { Link } from 'react-router-dom';interface NavItemsProps {	isLoggedIn: boolean;	userStatus: string | null;	onDisconnect: () => void;}const NavItems: React.FC<NavItemsProps> = ({ isLoggedIn, userStatus, onDisconnect }) => (	<>		{isLoggedIn ? (			<>				{userStatus === 'RENTER' && (					<li><Link to="/estimate">Estimate</Link></li>				)}				{(userStatus === 'FREE' || userStatus === 'BAGPACKER' || userStatus === 'EXPLORATOR') && (					<li><Link to="/search">Search</Link></li>				)}				{userStatus === 'ADMIN' && (					<li><Link to="/admin/locations">Validate</Link></li>				)}				<li>					<button onClick={onDisconnect}>Disconnect</button>				</li>			</>		) : (			<>				<li><Link to="/login">Login</Link></li>				<li><Link to="/register">Sign Up</Link></li>			</>		)}	</>);export default NavItems;