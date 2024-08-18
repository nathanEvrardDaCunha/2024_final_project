import React, { useState } from 'react';import { useNavigate } from 'react-router-dom';import { loginValidationSchema } from '../validations/loginFormValidation';import { LoginFormData, LoginFormErrors } from '../types/loginFormType';import { setToken, setUserStatus, setUserId } from '../utils/jwt';const loginFormHook = () => {	const [formData, setFormData] = useState<LoginFormData>({		email: '',		password: ''	});		const [errors, setErrors] = useState<LoginFormErrors>({});	const [isSubmitting, setIsSubmitting] = useState(false);	const [attemptedSubmit, setAttemptedSubmit] = useState(false);	const [loginError, setLoginError] = useState<string | null>(null);	const navigate = useNavigate();		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {		const { name, value } = e.target;		setFormData(prevState => ({			...prevState,			[name]: value		}));				if (errors[name as keyof LoginFormErrors]) {			setErrors(prevErrors => ({				...prevErrors,				[name]: undefined			}));		}	};		const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {		e.preventDefault();		setIsSubmitting(true);		setAttemptedSubmit(true);		setLoginError(null);				try {			await loginValidationSchema.validate(formData, { abortEarly: false });			const response = await fetch('http://localhost:3000/auth/login', {				method: 'POST',				headers: {					'Content-Type': 'application/json',				},				body: JSON.stringify(formData),			});						if (!response.ok) {				const errorData = await response.json();				throw new Error(errorData.error || 'Login failed');			}						const data = await response.json();			console.log('Login successful:', data);			setToken(data.token);			setUserStatus(data.userStatus);			setUserId(data.userId.toString()); // Save user ID to localStorage			setErrors({});			navigate('/dashboard');		} catch (error) {			if (error instanceof Error) {				if ('inner' in error && Array.isArray((error as any).inner)) {					const newErrors: LoginFormErrors = {};					(error as any).inner.forEach((err: any) => {						if (err.path) {							newErrors[err.path as keyof LoginFormErrors] = err.message;						}					});					setErrors(newErrors);				} else {					setLoginError(error.message);				}			} else {				console.error('Login error:', error);				setLoginError('An unexpected error occurred');			}		} finally {			setIsSubmitting(false);		}	};		return { formData, errors, isSubmitting, attemptedSubmit, loginError, handleChange, handleSubmit };};export default loginFormHook;