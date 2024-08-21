import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
        token,
        newPassword: password
      });
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
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
              
              <h2 className="text-2xl font-bold text-gray-900">Reset Your Password</h2>
              <p className="mt-2 text-sm text-gray-600">
                Please enter and confirm your new password.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">New Password</label>
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                />
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                />
              </div>

              {message && (
                <div className={`text-sm mt-2 ${message.includes('do not match') ? 'text-red-500' : 'text-green-500'}`}>
                  {message}
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                Reset Password
                <FaLock className="inline-block w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
