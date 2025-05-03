import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ResultPage = () => {
  const { className, rollNumber } = useParams();
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    console.log("Class Name from URL:", className);
    console.log("Roll Number from URL:", rollNumber);
    const fetchResult = async () => {
      try {
        const response = await fetch(`https://backendforresult.onrender.com/api/result/${className}/${rollNumber}`);
        if (!response.ok) throw new Error('Result not found');
        const data = await response.json();
        setResultData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchResult();
  }, [className, rollNumber]);

  const downloadResult = async () => {
    if (!resultRef.current) return;

    const canvas = await html2canvas(resultRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: resultRef.current.scrollWidth,
      windowHeight: resultRef.current.scrollHeight
    });

    const imgWidth = 210; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );

    pdf.save(`Result_${resultData.name}_${className}.pdf`);
  };

  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;
  if (!resultData) return <div className="text-center p-4">Loading...</div>;

  const subjects = Object.keys(resultData.rounds[0].subjects);
const standard = className.toUpperCase();
  return (
    <div className="p-4">
      <div ref={resultRef} className="max-w-4xl mx-auto bg-white p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold mb-2">સંસ્કૃતિ સ્કૂલ, વિદ્યામંજરી જ્ઞાનપીઠ કેમ્પસ - સિહોર</h1>
          <h2 className="text-lg mb-2">{resultData.TestName}</h2>
          <div className="mb-2">
            <span className="font-semibold">વિદ્યાર્થીનું નામ: </span>
            {resultData.name}
          </div>
          <div>
            <span className="font-semibold">ધોરણ: </span>
            {standard} | <span className="font-semibold">વર્ગ રેન્ક: </span>
            {resultData.classRank}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">વિષય</th>
                {subjects.map(subject => (
                  <th key={subject} className="border p-2">
                    {subject === 'ganit' ? 'ગણિત' :
                     subject === 'samanya_gyan' ? 'સામાન્ય જ્ઞાન' :
                     subject === 'bhasha' ? 'ભાષા' :
                     subject === 'angreji' ? 'અંગ્રેજી' :
                     subject === 'hindi' ? 'હિન્દી' :
                     subject === 'kalshor' ? 'કલાશોર' :
                     subject === 'aaspas' ? 'આસપાસ' :
                     subject === 'kuhu' ? 'કુહુ' :
                     subject === 'kekarav' ? 'કેકરાવ' :
                     subject === 'palash' ? 'પલાશ' :
                     subject === 'vigyan' ? 'વિજ્ઞાન' :
                     subject === 'sanskrit' ? 'સંસ્કૃત' :
                     subject === 'samaj' ? 'સમાજશાસ્ત્ર' :
                     subject === 'gujarati' ? 'ગુજરાતી' : subject}
                  </th>
                ))}
                <th className="border p-2">કુલ ગુણ</th>
                <th className="border p-2">મેળવેલ ગુણ</th>
                <th className="border p-2">ટકા</th>
                <th className="border p-2">રાઉન્ડ રેન્ક</th>
              </tr>
            </thead>
            <tbody>
              {resultData.rounds.map((round, index) => {
                const totalMarks = Object.values(round.subjects).reduce((a, b) => parseInt(a) + parseInt(b), 0);
                const percentage = ((totalMarks / parseInt(resultData.maxMarksInRound)) * 100).toFixed(2);
                
                return (
                  <tr key={index}>
                    <td className="border p-2">Round-{round.roundNumber}</td>
                    {subjects.map(subject => (
                      <td key={subject} className="border p-2 text-center">
                        {parseInt(round.subjects[subject])}
                      </td>
                    ))}
                    <td className="border p-2 text-center">{resultData.maxMarksInRound}</td>
                    <td className="border p-2 text-center">{totalMarks}</td>
                    <td className="border p-2 text-center">{percentage}%</td>
                    <td className="border p-2 text-center">{round.rank}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center">
          <div>
            <span>મેળવેલ ગુણ: </span>
            {resultData.rounds.reduce((acc, round) => 
              acc + Object.values(round.subjects).reduce((a, b) => parseInt(a) + parseInt(b), 0), 0)} | 
            ટકાવારી: {((resultData.rounds.reduce((acc, round) => 
              acc + Object.values(round.subjects).reduce((a, b) => parseInt(a) + parseInt(b), 0), 0) / 
              (parseInt(resultData.maxMarksInRound) * resultData.rounds.length)) * 100).toFixed(2)}% | 
            ધોરણ રેન્ક: {resultData.standardRank}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button 
          onClick={downloadResult} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Download Result as PDF
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
