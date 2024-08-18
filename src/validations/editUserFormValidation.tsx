import * as Yup from 'yup';import { calculateAge } from '../utils/dateUtils';export const validationSchema = Yup.object().shape({	email: Yup.string()		.email('Invalid email address'),	firstname: Yup.string()		.matches(/^[a-zA-Z]*$/, 'First name should only contain letters'),	lastname: Yup.string()		.matches(/^[a-zA-Z]*$/, 'Last name should only contain letters'),	birthDate: Yup.date()		.transform((value, originalValue) => {			return originalValue ? new Date(originalValue) : null;		})		.typeError('Please enter a valid date')		.max(new Date(), 'Birth date cannot be in the future')		.test('age', 'You must be at least 18 years old', function(value) {			return !value || calculateAge(value) >= 18;		})		.nullable(),	phoneNumber: Yup.string()		.matches(/^(\+\d{2}[0-9]{9})?$/, 'Phone number must be in the format: +XXXXXXXXXXXX'),	currentPassword: Yup.string(),	newPassword: Yup.string()		.test('password-strength', 'Password must meet strength requirements', function(value) {			if (!value) return true; // Allow empty value			return (				value.length >= 8 &&				/[a-zA-Z]/.test(value) &&				/[0-9]/.test(value) &&				/[!@#$%^&*(),.?":{}|<>]/.test(value)			);		}),	confirmPassword: Yup.string()		.test('passwords-match', 'Passwords must match', function(value) {			return !this.parent.newPassword || value === this.parent.newPassword;		}),}).test('password-change', 'All password fields are required when changing password', function(values) {	const { currentPassword, newPassword, confirmPassword } = values;	const isChangingPassword = currentPassword || newPassword || confirmPassword;		if (isChangingPassword) {		const errors: Yup.ValidationError[] = [];		if (!currentPassword) {			errors.push(new Yup.ValidationError('Current password is required', currentPassword, 'currentPassword'));		}		if (!newPassword) {			errors.push(new Yup.ValidationError('New password is required', newPassword, 'newPassword'));		}		if (!confirmPassword) {			errors.push(new Yup.ValidationError('Confirm password is required', confirmPassword, 'confirmPassword'));		}		if (errors.length > 0) {			throw new Yup.ValidationError(errors);		}	}		return true;});