import React from 'react';interface BigCardProps {	children: React.ReactNode;	className?: string;}const BigCard: React.FC<BigCardProps> = ({ children, className = '' }) => {	return (		<div className={`card w-96 bg-base-100 shadow-xl ${className}`}>			{children}		</div>	);};export default BigCard;