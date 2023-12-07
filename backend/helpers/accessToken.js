import jwt from 'jsonwebtoken';
import 'dotenv/config';

function generateToken(payload) {
  return jwt.sign(payload, process.env.TOkEN_SECRET, { expiresIn: '1d' });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOkEN_SECRET, { expiresIn: '10m' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({
      code: res.statusCode,
      msg: 'You are not authenticated',
    });

  jwt.verify(token, process.env.TOkEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        code: res.statusCode,
        msg: 'Invalid token',
      });

    req.user = user;

    next();
  });
}

const verifyJWT = (token) => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        resolve({
          valid: false,
          expired: !!err.message,
          decoded: null,
        });
      }

      resolve({
        valid: true,
        expired: false,
        decoded,
      });
    });
  });
};

export { generateToken, authenticateToken, generateRefreshToken, verifyJWT };
