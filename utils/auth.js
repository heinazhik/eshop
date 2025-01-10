import jwt from 'jsonwebtoken';

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return !!decoded;
  } catch (error) {
    return false;
  }
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

export const refreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: true
    });
    return generateToken({ userId: decoded.userId });
  } catch (error) {
    return null;
  }
};
