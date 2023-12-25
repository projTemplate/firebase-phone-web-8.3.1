'use client'
import React, { useState, useRef } from 'react';
import {firebase, auth } from '@/util/firebase/firebaseConstants'


const RegistrationForm = () => {
  const [showVerification, setShowVerification] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<any>()

    const handlePhoneNumberSubmit = async (values) => {
        console.log("values", values)
        // setUserData(values);
        await onSignInSubmit(values)
    };

  //---------------------  Sending Verificaiton code process
    const onSignInSubmit = async (values) => {
        /**
         * Configuring the captcha
         */
        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': async (response) => {
                    console.log("recaptchaV==>", response)
                },
                defaultCountry: "IN"
            });
        const phoneNumber = "+251" + values.phoneNumber
        // console.log("--->>", phoneNumber)
        try {
            const res = await firebase.auth().signInWithPhoneNumber(phoneNumber, verify)
            setConfirmationResult(res)
            // console.log("resForVerify==>", res)
            setShowVerification(true)
            console.log("OTP has been sent")
        } catch (e) {
            console.log("someError happned", e)
            setShowVerification(false)
        }
    }


  const handleCodeSubmit =async (code) => {
        if(!code|| code==""){
            console.log("No code --", code)
            setShowVerification(false)
        }
      let userIdToken
      try {
          const res = await confirmationResult.confirm(code)
          userIdToken = await res.user.getIdToken()
          console.log("userIdToken=", userIdToken)
          alert("User is verified")
          // dispatch(signup(data, history))
      } catch (e) {
          console.log("tryError=", e)
      }
  }

  return (
    <div  className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-white">
        <div id="sign-in-button"/>
        <div id="recaptcha-container"/>
      <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-white">
        {!showVerification ? (
            <RegisterComponent handlePhoneNumberSubmit={handlePhoneNumberSubmit}/>
        ) : (
            <ConfirmComponent handleCodeSubmit={handleCodeSubmit} showRegister={()=>setShowVerification(false)}/>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;


//======================   below are ui components






const ConfirmComponent = ({handleCodeSubmit, showRegister})=>{

    const inputRefs = useRef([]);
    const [verificationCode, setVerificationCode] = useState('');

    const handleVerificationSubmit = (e) => {
        e.preventDefault();
        // const code = inputRefs.current.map((ref) => ref.value).join('');
        handleCodeSubmit(verificationCode)

    };
    const handleInputChange = (e) => {
        setVerificationCode(e.target.value);
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
    const focusPreviousInput = (index) => {
        if (index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };



    const handleCodeInput = (e, index) => {
        const inputValue = e.target.value;

        if (e.nativeEvent.inputType === 'deleteContentBackward' && inputValue.length === 0) {
            e.preventDefault();
            console.log("1")
            focusPreviousInput(index);
        } else if (e.nativeEvent.inputType === 'deleteContentBackward') {
            console.log("2")
            inputRefs.current[index - 1].focus();
            inputRefs.current[index - 1].value = '';
        } else if (inputValue.length > 0) {
            console.log("3")
            focusNextInput(index);
        }
    };

    return (
        <div className="rounded-lg p-6">
            <div className="flex items-center mb-6">
                <button
                    className="text-blue-500 font-semibold hover:underline focus:outline-none"
                    onClick={showRegister}
                >
                    &#8592; Back
                </button>
            </div>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Verification Code</h2>
            <form className="space-y-6" onSubmit={handleVerificationSubmit}>
                <div className="flex justify-center space-x-2">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="verification code"
                        value={verificationCode}
                        onChange={handleInputChange}
                    />
                    {/*{[...Array(5)].map((_, index) => (*/}
                    {/*    <input*/}
                    {/*        key={index}*/}
                    {/*        type="text"*/}
                    {/*        maxLength={1}*/}
                    {/*        className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"*/}
                    {/*        ref={(el) => (inputRefs.current[index] = el)}*/}
                    {/*        onChange={(e) => handleCodeInput(e, index)}*/}
                    {/*    />*/}
                    {/*))}*/}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
                >
                    Verify
                </button>
            </form>
        </div>
    )
}
const RegisterComponent=({handlePhoneNumberSubmit})=>{

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Access the form input values here: formData.firstName, formData.lastName, formData.phoneNumber
        console.log('First Name:', formData.firstName);
        console.log('Last Name:', formData.lastName);
        console.log('Phone Number:', formData.phoneNumber);
        handlePhoneNumberSubmit(formData)
    };

    return (
        <div className="rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex items-center space-x-2 mb-4">
                    <input
                        type="text"
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
                >
                    Submit Phone Number
                </button>
            </form>
        </div>
    )
}