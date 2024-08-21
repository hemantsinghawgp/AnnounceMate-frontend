import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, { email });
      setMessage(response.data.message || 'Password reset email sent. Please check your inbox.');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="text-center mb-6">
     <h1 className="text-4xl font-bold text-gray-800 mb-4">AnnounceMate</h1>
     </div>
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          <form className="px-5 py-7" onSubmit={handleSubmit}>
            <div className="text-center mb-6">
              
              <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              {message && <div className="text-green-500 text-sm mt-2">{message}</div>}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
                <FaLock className="inline-block w-4 h-4 ml-2" />
              </button>
            </div>
          </form>

          <div className="py-5">
            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
              >
                <FaLock className="inline-block w-4 h-4 align-text-bottom" />
                <span className="ml-1">Remember your password? Sign in</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
