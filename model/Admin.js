const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
 ID: {
  type: Number,
  default: () => Math.floor(Math.random() * 1000000),
},

  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  PicUrl: {
    type: String,
  },
  Password: {
    type: String,
  },
  Gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  Otp: {
    type: String,
  },
  role: {
    type: String,
    default:'admin'
  },
  
  OtpVerified: {
    type: Boolean,
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;