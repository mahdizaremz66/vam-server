const express = require('express');
const router = express.Router();
const { selectUser, createUser, updateUser, deleteUser, loginUser, logoutUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Select users
router.post('/select-user', authenticateToken, selectUser);

// Create a new user
router.post('/users', authenticateToken,createUser);

// Update a user
router.put('/users/:user_name_usr', authenticateToken, updateUser);

// Delete a user
router.delete('/users/:user_name_usr', authenticateToken, deleteUser);

// User login
router.post('/login', loginUser);

// User logout
router.post('/logout', authenticateToken, logoutUser);

module.exports = router;