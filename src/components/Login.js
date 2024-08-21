import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="text-center mb-6">
     <h1 className="text-4xl font-bold text-gray-800 mb-4">AnnounceMate</h1>
     </div>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form className="px-5 py-7" onSubmit={handleSubmit}>
          <div className="text-center mb-6">   
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>
            </div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input
              type="email"
              name="email"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
            <input
              type="password"
              name="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && <div className="text-red-500 text-sm mb-5">{error}</div>}
            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Login</span>
              <FaSignInAlt className="inline-block w-4 h-4" />
            </button>
          </form>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button
                  onClick={() => navigate('/forgot-password')}
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  <FaLock className="inline-block w-4 h-4 align-text-top" />
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              <div className="text-center sm:text-right whitespace-nowrap">
                <button
                  onClick={() => navigate('/register')}
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  <FaUserPlus className="inline-block w-4 h-4 align-text-bottom" />
                  <span className="inline-block ml-1">Register Here</span>
                </button>
              </div>
            </div>
          </div>
        </div>
   
      </div>
    </div>
  );
};

export default Login;
