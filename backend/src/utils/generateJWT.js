// src/utils/generateJWT.js
import jwt from 'jsonwebtoken';

const generateJWT = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.cookie('jwt', token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return token;
};

export default generateJWT;
