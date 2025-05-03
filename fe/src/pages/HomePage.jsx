import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (className && rollNumber) {
      navigate(`/result/${className}/${rollNumber}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
        {/* Class Dropdown */}
        <select
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Class</option>
          <option value="jr_kg">Jr. KG</option>
          <option value="sr_kg">Sr. KG</option>
          <option value="sr_kgb">Sr. KGB</option>
          <option value="1a">1A</option>
          <option value="1b">1B</option>
          <option value="2a">2A</option>
          <option value="2b">2B</option>
          <option value="3a">3A</option>
          <option value="3b">3B</option>
          <option value="4a">4A</option>
          <option value="4b">4B</option>
          <option value="5a">5A</option>
          <option value="5b">5B</option>
          <option value="6a">6A</option>
          <option value="6b">6B</option>
          <option value="7a">7A</option>
          <option value="7b">7B</option>
          <option value="8a">8A</option>
          <option value="8b">8B</option>
        </select>

        {/* Roll Number Input */}
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter Roll Number"
          className="p-2 border rounded"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get Result
        </button>

        {/* Admin Button */}
        <button
          onClick={() => navigate("/admin")}
          className="p-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Admin? Go to Admin Panel
        </button>
      </div>
    </div>
  );
};

export default HomePage;
