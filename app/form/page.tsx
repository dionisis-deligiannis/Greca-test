'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useMutation } from "react-query";
import axios from 'axios';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  email: yup.string().email().required(),
  ageGroup: yup.string().oneOf(['adult', 'child', 'infant']).required(),
  address: yup.string().required(),
});

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Define mutation function to submit form data
  // const mutation = useMutation(
  //   async (data: any) => {
  //     const response = await fetch('/api/route', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to submit form');
  //     }
  //     return await response.json();
  //   }
  // );

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Handle form submission
  const onSubmit = async (data: any) => {
    setStatus('submitting');
    try {
      // Call the mutation function to submit form data
      await mutation.mutateAsync(data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <>
      {status === 'idle' && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input {...register('firstName')} id="firstName" placeholder="First Name" />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input {...register('email')} id="email" placeholder="Email" />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor="ageGroup">Age Group</label>
            <select {...register('ageGroup')} id="ageGroup">
              <option value="adult">Adult</option>
              <option value="child">Child</option>
              <option value="infant">Infant</option>
            </select>
            {errors.ageGroup && <span>{errors.ageGroup.message}</span>}
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input {...register('address')} id="address" placeholder="Address" />
            {errors.address && <span>{errors.address.message}</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      {status === 'submitting' && <p>Please wait...</p>}
      {status === 'success' && <p>Form submitted successfully</p>}
      {status === 'error' && <p>Error: Failed to submit form</p>}
    </>
  );
};

export default Form;
