const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser, loginUser, logoutUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Create a new user
router.post('/users', createUser);

// Update a user
router.put('/users/:user_name_usr', authenticateToken, updateUser);

// Delete a user
router.delete('/users/:user_name_usr', authenticateToken, deleteUser);

// User login
router.post('/login', loginUser);

// User logout
router.post('/logout', authenticateToken, logoutUser);

module.exports = router;