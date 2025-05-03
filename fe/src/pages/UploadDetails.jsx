import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const token = localStorage.getItem("token");
const SUBJECTS_BY_STANDARD = {
  jr_kg: ["ganit", "samanya_gyan", "bhasha", "angreji"],
  sr_kg: ["ganit", "samanya_gyan", "bhasha", "angreji"],
  sr_kgb: ["ganit", "samanya_gyan", "bhasha", "angreji"],
  "1a": ["ganit", "angreji", "bhasha", "hindi"],
  "1b": ["ganit", "angreji", "bhasha", "hindi"],
  "2a": ["ganit", "angreji", "bhasha", "hindi"],
  "2b": ["ganit", "angreji", "bhasha", "hindi"],
  "3a": ["ganit", "kalshor", "hindi", "angreji", "aaspas"],
  "3b": ["ganit", "kalshor", "hindi", "angreji", "aaspas"],
  "4a": ["ganit", "kuhu", "hindi", "angreji", "aaspas"],
  "4b": ["ganit", "kuhu", "hindi", "angreji", "aaspas"],
  "5a": ["ganit", "kekarav", "hindi", "angreji", "aaspas"],
  "5b": ["ganit", "kekarav", "hindi", "angreji", "aaspas"],
  "6a": ["ganit", "palash", "vigyan", "sanskrit", "hindi", "samaj"],
  "6b": ["ganit", "palash", "vigyan", "sanskrit", "hindi", "samaj"],
  "7a": ["ganit", "gujarati", "vigyan", "sanskrit", "hindi", "samaj"],
  "7b": ["ganit", "gujarati", "vigyan", "sanskrit", "hindi", "samaj"],
  "8a": ["ganit", "gujarati", "vigyan", "sanskrit", "hindi", "samaj"],
  "8b": ["ganit", "gujarati", "vigyan", "sanskrit", "hindi", "samaj"],
};

const UploadDetails = () => {
  const [selectedStandard, setSelectedStandard] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    maxMarksInRound: "",
    classRank: "",
    standardRank: "",
    rounds: Array(5).fill().map((_, idx) => ({
      roundNumber: idx + 1,
      subjects: {},
      rank: "",
    })),
  });

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const std = searchParams.get("standard");
    if (std && SUBJECTS_BY_STANDARD[std]) {
      setSelectedStandard(std);
      initializeSubjects(std);
    }
  }, [location]);

  const initializeSubjects = (standard) => {
    const subjects = SUBJECTS_BY_STANDARD[standard];
    setFormData((prev) => ({
      ...prev,
      rounds: prev.rounds.map((round) => ({
        ...round,
        subjects: subjects.reduce((acc, subject) => ({ ...acc, [subject]: "" }), {}),
      })),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check if roll number already exists
      const checkResponse = await fetch(`https://backendforresult.onrender.com/api/result/${selectedStandard}/${formData.rollNumber}`);
      
      if (checkResponse.ok) {
        alert("Error: A student with this roll number already exists.");
        return; // Stop submission
      }
  
      // Proceed with submission if roll number does not exist
      const response = await fetch(`https://backendforresult.onrender.com/api/result/${selectedStandard}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error("Failed to submit results");
  
      alert("Results submitted successfully!");
      window.location.reload(); // Refresh the page after successful submission
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl space-y-4">
        <h2 className="text-xl font-semibold text-center">Upload Student Results</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Student Name" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 border rounded" required />
          <input type="text" placeholder="Roll Number" value={formData.rollNumber}
            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            className="p-2 border rounded" required />
          <input type="number" placeholder="Max Marks in Round" value={formData.maxMarksInRound}
            onChange={(e) => setFormData({ ...formData, maxMarksInRound: e.target.value })}
            className="p-2 border rounded" required />
          <input type="number" placeholder="Class Rank" value={formData.classRank}
            onChange={(e) => setFormData({ ...formData, classRank: e.target.value })}
            className="p-2 border rounded" required />
          <input type="number" placeholder="Standard Rank" value={formData.standardRank}
            onChange={(e) => setFormData({ ...formData, standardRank: e.target.value })}
            className="p-2 border rounded" required />
          <input type="text" placeholder="Test Name(eg.VTP-2_Round-1 To 5 Result)" value={formData.TestName}
            onChange={(e) => setFormData({ ...formData, TestName: e.target.value })}
            className="p-2 border rounded" required />
        </div>

        {formData.rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="border p-4 rounded">
            <h3 className="font-medium">Round {round.roundNumber}</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(round.subjects).map((subject) => (
                <input key={subject} type="number" placeholder={subject}
                  value={round.subjects[subject]}
                  onChange={(e) => {
                    const newRounds = [...formData.rounds];
                    newRounds[roundIndex].subjects[subject] = e.target.value;
                    setFormData({ ...formData, rounds: newRounds });
                  }}
                  className="p-2 border rounded" required />
              ))}
              <input type="number" placeholder="Rank" value={round.rank}
                onChange={(e) => {
                  const newRounds = [...formData.rounds];
                  newRounds[roundIndex].rank = e.target.value;
                  setFormData({ ...formData, rounds: newRounds });
                }}
                className="p-2 border rounded" required />
            </div>
          </div>
        ))}

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Submit Results
        </button>
      </form>
    </div>
  );
};

export default UploadDetails;
