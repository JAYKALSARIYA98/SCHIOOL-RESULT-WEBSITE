const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Get the token from Authorization header
  
  if (!token) {
    return res.status(403).json({ error: 'Token is required' });
  }

  jwt.verify(token, 'JaysSecret@#&', (err, decoded) => { // Replace 'your_jwt_secret' with your secret key
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = decoded; // Attach decoded info (like email, role) to request object
    next(); // Allow access to the protected route
  });
}

module.exports = verifyToken;
