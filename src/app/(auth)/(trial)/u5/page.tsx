'use client'
import React, { useState, useRef } from 'react';

const RegistrationForm = () => {
  const [showVerification, setShowVerification] = useState(false);
  const inputRefs = useRef([]);

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
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
  const handlePaste = (e, index) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    if (pasteData.length === 1 && !isNaN(pasteData)) {
      inputRefs.current[index].value = pasteData;
      focusNextInput(index);
    }
  };

  const handleCodeInput = (e, index) => {
    if (e.target.value.length > 0) {
        focusNextInput(index);
      } else if (e.target.value.length === 0) {
        focusPreviousInput(index);
      }
  };
  const focusPreviousInput = (index) => {
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-white">
        {!showVerification ? (
          <div className="rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
            <form className="space-y-6" onSubmit={handlePhoneNumberSubmit}>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Last Name"
                />
              </div>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Phone Number"
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
      </div>
    </div>
  );
};

export default RegistrationForm;
