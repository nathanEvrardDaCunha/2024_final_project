import React from 'react';import { Link } from 'react-router-dom';interface NavItemsProps {	isLoggedIn: boolean;	userStatus: string | null;	onDisconnect: () => void;}const NavItems: React.FC<NavItemsProps> = ({ isLoggedIn, userStatus, onDisconnect }) => (	<>		{isLoggedIn ? (			<>				{userStatus === 'RENTER' && (					<li className="menu-title">						<span className="flex gap-2">							<Link to="/estimate" className="btn btn-ghost btn-sm">Estimate</Link>							<Link to="/my-published-locations" className="btn btn-ghost btn-sm">Manage</Link>						</span>					</li>				)}				{(userStatus === 'FREE' || userStatus === 'BAGPACKER' || userStatus === 'EXPLORATOR') && (					<li className="menu-title">						<span className="flex gap-2">							<Link to="/locations" className="btn btn-ghost btn-sm">Search</Link>						</span>					</li>				)}				{userStatus === 'ADMIN' && (					<li className="menu-title">                        <span className="flex gap-2">	                        <Link to="/locations" className="btn btn-ghost btn-sm">Search</Link>                            <Link to="/admin/locations" className="btn btn-ghost btn-sm">Validate</Link>                            <Link to="/locations/pending-publish" className="btn btn-ghost btn-sm">Publish</Link>	                        <Link to="/user-management" className="btn btn-ghost btn-sm">Manage</Link>                        </span>					</li>				)}				<li>				</li>				<li className="menu-title">					<span className="flex">						<button onClick={onDisconnect} className="btn btn-ghost btn-sm">Disconnect</button>					</span>				</li>			</>		) : (			<>				<li className="menu-title">					<span className="flex gap-2">						<Link to="/membership" className="btn btn-ghost btn-sm">Subscribe</Link>						<Link to="/locations" className="btn btn-ghost btn-sm">Search</Link>                        <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>                        <Link to="/register" className="btn btn-ghost btn-sm">Sign Up</Link>                    </span>				</li>			</>		)}	</>);export default NavItems;