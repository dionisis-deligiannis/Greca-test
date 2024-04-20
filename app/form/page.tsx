'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './FormPage.css'; 


interface FormData {
  firstName: string;
  email: string;
  ageGroup: 'adult' | 'child' | 'infant' | '';
  address?: string; 
}

const schema = yup.object().shape({
  firstName: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  ageGroup: yup.string().oneOf(['', 'adult', 'child', 'infant'] as const).required('Please choose your age group'),
  address: yup.string().optional(),
});

const FormPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      ageGroup: '',
    },
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormData) => {
    setStatus('submitting');
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        reset();
        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  let buttonContent;
  let buttonClassName;

  switch (status) {
    case 'submitting':
      buttonContent = <p>Please wait...</p>;
      buttonClassName = '';
      break;
    case 'success':
      buttonContent = <p>Form submitted successfully</p>;
      buttonClassName = 'button-success';
      break;
    case 'error':
      buttonContent = <p>Failed to submit form</p>;
      buttonClassName = 'button-error';
      break;
    default:
      buttonContent = 'Submit';
      buttonClassName = 'button-idle';
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input {...register('firstName')} id="firstName" placeholder="First Name" />
          {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input {...register('email')} id="email" placeholder="Email" />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="ageGroup">Age Group</label>
          <select {...register('ageGroup')} id="ageGroup">
            <option value="">Choose...</option>
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant">Infant</option>
          </select>
          {errors.ageGroup && <span className="error-message">{errors.ageGroup.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input {...register('address')} id="address" placeholder="Address" />
          {errors.address && <span className="error-message">{errors.address.message}</span>}
        </div>
        <button type="submit" disabled={status === 'submitting'} className={buttonClassName}>
          {buttonContent}
        </button>
      </form>
    </div>
  );
};

export default FormPage;
