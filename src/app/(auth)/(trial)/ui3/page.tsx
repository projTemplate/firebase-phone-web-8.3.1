// RegistrationForm.js (Next.js page)
'use client'

// RegistrationForm.js (Next.js page)

import React, { useState, useRef } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const inputRefs = useRef([]);
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
    const code = inputRefs.current.map((ref) => ref.value).join('');
    alert(`Verification code submitted: ${code}`);
  };

  const handleBackToRegistration = () => {
    setShowVerification(false);
  };
  const focusNextInput = (index) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleCodeInput = (e, index) => {
    if (e.target.value.length > 0) {
      focusNextInput(index);
    }
    const code = inputRefs.current.map((ref) => ref.value).join('');
    if (code.length === inputRefs.current.length) {
      setVerificationCode(code);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-white">
        {!showVerification ? (
          <div className="rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
            <form className="space-y-6" onSubmit={handlePhoneNumberSubmit}>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-1/2 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-1/2 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
              >
                Submit Phone Number
              </button>
            </form>
          </div>
        ) : (
            <div className="rounded-lg p-6">
            <div className="flex items-center mb-6">
              <button
                className="text-blue-500 font-semibold hover:underline focus:outline-none"
                onClick={handleBackToRegistration}
              >
                &#8592; Back
              </button>
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Verification Code</h2>
            <form className="space-y-6" onSubmit={handleVerificationSubmit}>
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleCodeInput(e, index)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
              >
                Verify
              </button>
            </form>
          </div>
        )}
        {showVerification && (
          <button
            className="block mt-4 text-blue-500 font-semibold hover:underline focus:outline-none"
            onClick={handleBackToRegistration}
          >
            &#8592; Back to Registration
          </button>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
