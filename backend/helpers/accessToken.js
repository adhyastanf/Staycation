import jwt from 'jsonwebtoken';
import 'dotenv/config';

function generateToken(payload) {
  return jwt.sign(payload, process.env.TOkEN_SECRET, { expiresIn: '1d' });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOkEN_SECRET, { expiresIn: '10m' });
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

export { generateToken, generateRefreshToken, verifyJWT };
