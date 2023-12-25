'use client'// RegistrationForm.js (Next.js page)

import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    setSubmittedPhoneNumber(formData.phoneNumber);
    setShowVerification(true);
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    alert('Verification successful! You can proceed with registration.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        <form className="space-y-6" onSubmit={handlePhoneNumberSubmit}>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-1/2">
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              type="tel"
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
              type="submit"
            >
              Next (Phone Verification)
            </button>
          </div>
        </form>

        {showVerification && (
          <form className="mt-6 space-y-6" onSubmit={handleVerificationSubmit}>
            <p className="text-center text-gray-800">
              Please enter the verification code sent to {submittedPhoneNumber}:
            </p>
            <div>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
                type="submit"
              >
                Verify
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
