const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const SalesUser = require('../../model/Sales_user');

dotenv.config();

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowercaseEmail = email.toLowerCase();

    const user = await SalesUser.findOne({ email: { $regex: new RegExp(`^${lowercaseEmail}$`, 'i') } })
      .select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is inactive. Please contact an administrator.' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SALES_PIPELINE,
      { expiresIn: '30d' }
    );

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    const response = {
      data: {
        token
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { signin };
