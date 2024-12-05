const express = require('express');
const router = express.Router();
const { signin } = require('../controller/Auth/registration');

router.post('/signin', signin);                                                          

module.exports = router;

