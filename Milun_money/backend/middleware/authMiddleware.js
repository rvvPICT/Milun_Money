// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// export const authenticateUser = (req, res, next) => {
//     const token = req.header("Authorization")?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Access Denied! No token provided." });
//     }

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(403).json({ message: "Invalid or expired token." });
//     }
// };

import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header - handle both formats
    const authHeader = req.header('Authorization');
    let token;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '');
    } else {
      // For backward compatibility if token is sent directly
      token = authHeader;
    }
    
    if (!token) {
      console.log('No auth token provided');
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      console.log('Invalid token format', decoded);
      return res.status(401).json({ error: 'Invalid authentication token' });
    }
    
    // Find the user
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log('User not found for token');
      return res.status(401).json({ error: 'User not found' });
    }
    
    // Set user in request object
    req.user = { id: user._id };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    res.status(401).json({ error: 'Authentication failed' });
  }
};