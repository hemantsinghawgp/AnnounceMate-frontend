import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaSignOutAlt, FaEdit, FaPaperPlane } from 'react-icons/fa';
import { MdPreview } from 'react-icons/md';

const Home = () => {
  const [user, setUser] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [announcement, setAnnouncement] = useState('');
  const [preview, setPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Predefined list of Google Groups
  const googleGroups = [
    { id: 'group1', name: 'Faculty' },
    { id: 'group2', name: 'Students' },
    { id: 'group3', name: 'Staff' },
    { id: 'group4', name: 'Alumni' },
    { id: 'group5', name: 'TestGroup' }
  ];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleGroupSelection = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(g => g !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/announcements`, {
        message: announcement,
        targetGroups: selectedGroups
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Announcement sent successfully to selected groups!');
      setAnnouncement('');
      setSelectedGroups([]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Failed to send announcement. Please try again.');
      console.error('Error sending announcement:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">AnnounceMate</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Side: Target Groups */}
          <div className="w-full lg:w-1/5 px-4 py-6 bg-white rounded-lg shadow-md">
            <p className="text-xl font-medium">Select Target Groups</p>
            <p className="text-gray-400">Choose the groups you want to target for the announcement.</p>
            <div className="mt-6 space-y-3">
              {googleGroups.map((group) => (
                <div key={group.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={group.id}
                    value={group.id}
                    checked={selectedGroups.includes(group.id)}
                    onChange={() => handleGroupSelection(group.id)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor={group.id} className="ml-3 text-sm font-medium text-gray-700">
                    {group.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Rich Text Editor */}
          <div className="w-full lg:w-4/5 px-4 py-6 bg-white rounded-lg shadow-md">
            <p className="text-xl font-medium">Announcement</p>
            <p className="text-gray-400">Write your announcement and preview it before submitting.</p>
            <div className="mt-6">
              <ReactQuill
                value={announcement}
                onChange={setAnnouncement}
                modules={{
                  toolbar: [
                    [{ 'header': '1'}, { 'header': '2' }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link'],
                    ['clean']
                  ]
                }}
                className="h-auto"
              />
            </div>
          </div>
        </div>

        {/* Buttons: Preview and Submit */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-4">
            <button
              onClick={() => setPreview(!preview)}
              className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {preview ? <FaEdit className="mr-2" /> : <MdPreview className="mr-2" />} {preview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              <FaPaperPlane className="mr-2" /> {isLoading ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </div>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {preview && (
          <div className="mt-8 p-4 border rounded-lg bg-gray-100">
            <h3 className="text-lg font-semibold">Preview</h3>
            <div dangerouslySetInnerHTML={{ __html: announcement }} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;