const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    console.log('Received token:', token ? 'Token present' : 'No token');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    if (token === 'undefined' || token === 'null') {
      return res.status(401).json({ message: 'Invalid token format' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
      req.user = decoded.user;
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return res.status(401).json({ message: 'Token is invalid or expired' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server authentication error' });
  }
};

module.exports = auth;