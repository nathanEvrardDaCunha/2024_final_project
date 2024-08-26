import React, { useState } from 'react';import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';import { StripeCardElementOptions } from '@stripe/stripe-js';interface PaymentFormProps {	amount: number;	onSuccess: (paymentMethod: { id: string }) => void;	onCancel: () => void;}const cardElementOptions: StripeCardElementOptions = {	style: {		base: {			fontSize: '16px',			color: '#424770',			'::placeholder': {				color: '#aab7c4',			},		},		invalid: {			color: '#9e2146',		},	},};const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onCancel }) => {	const stripe = useStripe();	const elements = useElements();	const [error, setError] = useState<string | null>(null);		const handleSubmit = async (event: React.FormEvent) => {		event.preventDefault();				if (!stripe || !elements) {			return;		}				const cardElement = elements.getElement(CardElement);				if (cardElement) {			const { error, paymentMethod } = await stripe.createPaymentMethod({				type: 'card',				card: cardElement,			});						if (error) {				setError(error.message ?? 'An unknown error occurred');			} else if (paymentMethod) {				onSuccess(paymentMethod);			}		}	};		return (		<form onSubmit={handleSubmit}>			<CardElement options={cardElementOptions} />			{error && <div className="text-red-500 mt-2">{error}</div>}			<div className="mt-4">				<button type="submit" className="btn btn-primary mr-2" disabled={!stripe}>					Pay ${amount.toFixed(2)}				</button>				<button type="button" className="btn btn-secondary" onClick={onCancel}>					Cancel				</button>			</div>		</form>	);};export default PaymentForm;