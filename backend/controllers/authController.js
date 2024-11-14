import bcrypt from 'bcrypt';
import { generateRefreshToken, generateToken, verifyJWT } from '../helpers/accessToken.js';
import User from '../model/user.js';

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(400).json({
        code: res.statusCode,
        msg: 'User not found',
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(401).json({
        code: res.statusCode,
        msg: 'Password not matched',
      });
    }

    const payload = { username, user_id: user.id };

    const accessToken = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const { password: pwd, ...other } = user.dataValues;

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });
    
    // Set cookies
    // res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    // res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });

    return res.status(200).json({
      code: res.statusCode,
      msg: 'User login successfully',
      data: { ...other, accessToken, refreshToken },
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, fullname } = req.body;
  const saltRounds = 10;

  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
      fullname
    });

    return res.status(200).json({
      code: res.statusCode,
      msg: 'User found',
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findAll({ attributes: ['firstName', 'lastName'] });
    return res.status(200).json({
      code: res.statusCode,
      msg: 'User found',
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const refreshToken = async (req, res) => {
  const token = req.cookies?.jwt;
  if (!token)
    return res.status(401).json({
      code: res.statusCode,
      msg: 'Unauthorized',
    });
  try {
    const { decoded } = await verifyJWT(token);

    const user = await User.findOne({
      where: { username: decoded.username },
    });

    if (!user) {
      return res.status(401).json({
        code: res.statusCode,
        msg: 'Unauthorized',
      });
    }

    const payload = { username: user.username, userId: user.userId };

    const accessToken = generateToken(payload);

    return res.status(200).json({
      code: res.statusCode,
      msg: 'Refresh token successfully',
      data: { accessToken },
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: err.message,
    });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.status(200).json({
      code: res.statusCode,
      msg: 'User Has Successfully Logout',
    });
  } catch (err) {
    return res.status(500).json({
      code: res.statusCode,
      msg: 'Internal Server Error',
    });
  }
};

export { loginUser, registerUser, refreshToken, logoutUser, getUser };
