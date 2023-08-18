require('dotenv').config();

const jwt = require('jsonwebtoken');

exports.generateToken = (user_name_usr) => {
  const token = jwt.sign({ user_name_usr }, process.env.JWT_SECRET, { expiresIn: '3h' });
  return token;
};

// تابع اعتبارسنجی توکن
exports.authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      req.user = decoded; // اطلاعات کاربر درخواست کننده را در req.user قرار می‌دهیم
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'عملیات با خطا مواجه شد: خطای داخلی سرور!' });
  }
};