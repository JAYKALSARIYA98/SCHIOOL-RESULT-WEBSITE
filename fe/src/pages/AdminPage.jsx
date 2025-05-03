// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

const STANDARDS = [
  { id: 'jr_kg', label: 'Jr. KG' },
  { id: 'sr_kg', label: 'Sr. KG' },
  { id: 'sr_kgb', label: 'Sr. KGB' },
  { id: '1a', label: '1A' },
  { id: '1b', label: '1B' },
  { id: '2a', label: '2A' },
  { id: '2b', label: '2B' },
  { id: '3a', label: '3A' },
  { id: '3b', label: '3B' },
  { id: '4a', label: '4A' },
  { id: '4b', label: '4B' },
  { id: '5a', label: '5A' },
  { id: '5b', label: '5B' },
  { id: '6a', label: '6A' },
  { id: '6b', label: '6B' },
  { id: '7a', label: '7A' },
  { id: '7b', label: '7B' },
  { id: '8a', label: '8A' },
  { id: '8b', label: '8B' }
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [selectedStandard, setSelectedStandard] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const rollNumberRef = useRef(null);

  useEffect(() => {
    if (rollNumberRef.current) {
      rollNumberRef.current.focus();
    }
  }, [rollNumber]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const handleGo = () => {
    if (!selectedStandard) return;
    navigate(`/uploaddetails?standard=${selectedStandard}`);
  };

  const handleFetchResult = async () => {
    if (!selectedStandard || !rollNumber) return;
    try {
      const response = await fetch(`https://backendforresult.onrender.com/api/result/${selectedStandard}/${rollNumber}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching result:', error);
    }
  };

  const handleDeleteResult = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await fetch(`https://backendforresult.onrender.com/api/result/${selectedStandard}/${rollNumber}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(null);
      alert('Result deleted successfully');
    } catch (error) {
      console.error('Error deleting result:', error);
    }
  };

  const StandardSelector = () => (
    <div className="flex space-x-4 mb-4 items-end">
      <div>
        <label className="block text-sm font-medium mb-1">Select Class</label>
        <select
          value={selectedStandard}
          onChange={(e) => setSelectedStandard(e.target.value)}
          className="p-2 border rounded min-w-[200px]"
        >
          <option value="">Select Class</option>
          {STANDARDS.map(({ id, label }) => (
            <option key={id} value={id}>{label}</option>
          ))}
        </select>
      </div>
      {activeTab === 'add' && (
        <button
          onClick={handleGo}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go
        </button>
      )}
    </div>
  );

  const DeleteSection = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Delete Result</h2>
      <StandardSelector />
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Enter Roll Number</label>
        <input
          ref={rollNumberRef}
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="p-2 border rounded min-w-[200px]"
        />
      </div>
      <button
        onClick={handleFetchResult}
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Fetch Result
      </button>
      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold">Result Details</h3>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Roll Number:</strong> {result.rollNumber}</p>
          <button
            onClick={handleDeleteResult}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete Result
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Results Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="flex space-x-2 p-4 border-b">
            <button
              onClick={() => setActiveTab('add')}
              className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === 'add'
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 bg-gray-100'
              }`}
            >
              Add Result
            </button>
            <button
              onClick={() => setActiveTab('delete')}
              className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === 'delete'
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 bg-gray-100'
              }`}
            >
              Delete Result
            </button>
          </div>
          {activeTab === 'add' && <StandardSelector />}
          {activeTab === 'delete' && <DeleteSection />}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;