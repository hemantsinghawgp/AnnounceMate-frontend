import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    designation: '',
    uniqueId: '',
    role: 'student' // default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic form validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formData);
      console.log('Registration successful:', response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-2xl">
      <div className="text-center mb-6">
     <h1 className="text-4xl font-bold text-gray-800 mb-4">AnnounceMate</h1>
    
     </div>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form className="px-5 py-7" onSubmit={handleSubmit}>
          <div className="text-center mb-6">   
              <h2 className="text-2xl font-bold text-gray-900">Register Here</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
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
              </div>
              <div>
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
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Designation</label>
                <input
                  type="text"
                  name="designation"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Unique ID</label>
                <input
                  type="text"
                  name="uniqueId"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  placeholder="Unique ID"
                  value={formData.uniqueId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Role</label>
                <select
                  name="role"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                  <option value="project_staff">Project Staff</option>
                </select>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mb-5">{error}</div>}

            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Register</span>
              <FaUserPlus className="inline-block w-4 h-4" />
            </button>
          </form>
          <div className="py-5">
            <div className="grid grid-cols-1 gap-1">
              <div className="text-center sm:text-center whitespace-nowrap">
                <button
                  onClick={() => navigate('/login')}
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  <FaSignInAlt className="inline-block w-4 h-4 align-text-bottom" />
                  <span className="inline-block ml-1">Already have an account? Sign in</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
