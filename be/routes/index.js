const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {
  JrKgResult, SrKgResult, Class1Result, Class2Result,
  Class3Result, Class4Result, Class5Result, Class6Result,
  Class7Result, Class8Result
} = require('../models/jr_kg');
const verifyToken = require('../middleware/jwtMiddleware');
const authenticateAdmin = require('../middleware/authMiddleware');
function GetModel (classtype){
  let  Classtype = classtype;
  let Model;
  switch (Classtype) {
    case 'jr_kg':
      Model = JrKgResult;
      break;
    case 'sr_kg':
    case 'sr_kgb':
      Model = SrKgResult;
      break;
    case '1a':
    case '1b':
      Model = Class1Result;
      break;
    case '2a':
    case '2b':
      Model = Class2Result;
      break;
    case '3a':
    case '3b':
      Model = Class3Result;
      break;
    case '4a':
    case '4b':
      Model = Class4Result;
      break;
    case '5a':
    case '5b':
      Model = Class5Result;
      break;
    case '6a':
    case '6b':
      Model = Class6Result;
      break;
    case '7a':
    case '7b':
      Model = Class7Result;
      break;
    case '8a':
    case '8b':
      Model = Class8Result;
      break;
    default:
      return res.status(400).json({ error: 'Invalid class specified' });
    
}
return Model;
}
// authenticateAdmin
router.post('/result/:class', verifyToken, async (req, res) => {
  try {
    const classType = req.params.class.toLowerCase();
    const Model = GetModel(classType); // Get the appropriate model

    if (!Model) {
      return res.status(400).json({ error: "Invalid class type" });
    }

    const classPrefix = classType.toUpperCase();
    const formattedRollNumber = `${classPrefix}_${req.body.rollNumber}`;

    // Check if roll number already exists
    const existingResult = await Model.findOne({ rollNumber: formattedRollNumber });

    if (existingResult) {
      return res.status(400).json({ error: "Roll number already exists" });
    }

    // Create new result
    const newResult = new Model({
      name: req.body.name,
      rollNumber: formattedRollNumber,
      rounds: req.body.rounds,
      classRank: req.body.classRank,
      standardRank: req.body.standardRank,
      maxMarksInRound: req.body.maxMarksInRound,
      TestName: req.body.TestName
    });

    const savedResult = await newResult.save();
    res.status(201).json(savedResult);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add this route after your existing POST route

router.get('/result/:class/:rollNumber', async (req, res) => {
  console.log("request come to get result")
    try {
      const classType = req.params.class.toLowerCase();
      console.log(classType)
      const rollNumber = req.params.rollNumber;
      console.log(rollNumber)
      let Model = GetModel(classType);
  
  
      // Format the roll number same way as during insertion
      const classPrefix = classType.toUpperCase();
      const formattedRollNumber = `${classPrefix}_${rollNumber}`;
      console.log(formattedRollNumber)
     
      // Find the student result
      const result = await Model.findOne({ rollNumber: formattedRollNumber });
  
      if (!result) {
        return res.status(404).json({ error: 'Student result not found' });
      }
  
      res.status(200).json(result);
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.get('/results/:class',  async (req, res) => {
    try {
      const classType = req.params.class.toLowerCase();
      let Model = GetModel(classType);
  
      const results = await Model.find();
  
      if (!results) {
        return res.status(404).json({ error: 'No results found' });
      }
  
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.put('/result/:class/:rollNumber', verifyToken, async (req, res) => {
    try {
      const classType = req.params.class.toLowerCase();
      const rollNumber = req.params.rollNumber;
      const updatedData = req.body;
  
      let Model = GetModel(classType);
      
      // Format the roll number same way as during insertion
      const classPrefix = classType.toUpperCase();
      const formattedRollNumber = `${classPrefix}_${rollNumber}`;
  
      // Find the student result by roll number
      const result = await Model.findOne({ rollNumber: formattedRollNumber });
  
      if (!result) {
        return res.status(404).json({ error: 'Student result not found' });
      }
  
      // Update the result with the new data
      Object.assign(result, updatedData);
  
      // Save the updated result
      const updatedResult = await result.save();
  
      res.status(200).json(updatedResult);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.delete('/result/:class/:rollNumber', verifyToken, async (req, res) => {
    try {
      const classType = req.params.class.toLowerCase();
      const rollNumber = req.params.rollNumber;
  
      let Model = GetModel(classType);
  
      // Format the roll number same way as during insertion
      const classPrefix = classType.toUpperCase();
      const formattedRollNumber = `${classPrefix}_${rollNumber}`;
  
      // Find the student result by roll number
      const result = await Model.findOneAndDelete({ rollNumber: formattedRollNumber });
  
      if (!result) {
        return res.status(404).json({ error: 'Student result not found' });
      }
  
      res.status(200).json({ message: 'Result deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.post('/auth/signin', authenticateAdmin, async (req, res) => {
    // Since the admin authentication is done in the middleware, we can proceed to generate the token.
    const ADMIN_EMAIL = req.body.email;
    const payload = { email: ADMIN_EMAIL, role: 'admin' }; // Add any additional info you need here
    const token = jwt.sign(payload, 'JaysSecret@#&', { expiresIn: '12h' }); // Replace 'your_jwt_secret' with your secret key
    
    res.json({ token });
  });
  
module.exports = router;