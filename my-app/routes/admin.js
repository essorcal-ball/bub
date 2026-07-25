const express = require('express');
const router = express.Router();

// Middleware to verify if the requesting user is an admin
// (In production, replace 'req.user' with your actual JWT/session authentication)
const verifyAdmin = (req, res, next) => {
  // Mock authentication check for demonstration:
  // Requires passing an authorization header equal to "Bearer admin-secret-key"
  const authHeader = req.headers.authorization;
  
  if (!authHeader || authHeader !== 'Bearer admin-secret-key') {
    return res.status(403).json({ error: 'Access denied. Valid admin authentication token required.' });
  }
  
  next();
};

/**
 * @route   PUT /api/admin/highscore
 * @desc    Allows an admin to manually update a user's high score
 */
router.put('/highscore', verifyAdmin, async (req, res) => {
  const { userId, newHighScore } = req.body;

  // Validate request inputs
  if (!userId || typeof newHighScore !== 'number' || newHighScore < 0) {
    return res.status(400).json({ 
      error: 'Invalid input. Please provide a valid userId and a non-negative number for newHighScore.' 
    });
  }

  try {
    // Database logic placeholder:
    // Replace this mock update with your actual database call.
    // Example (MongoDB/Mongoose):
    // const updatedUser = await User.findByIdAndUpdate(userId, { highScore: newHighScore }, { new: true });
    
    // Example (Mocked response for testing):
    const updatedUser = {
      id: userId,
      username: 'Player1',
      highScore: newHighScore
    };

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json({
      message: 'High score updated successfully.',
      user: updatedUser
    });

  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'Failed to update high score due to internal server error.' });
  }
});

module.exports = router;
