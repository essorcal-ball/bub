/**
 * Sends a request to the backend to update a target user's high score.
 * 
 * @param {string} userId - Target user ID
 * @param {number} newHighScore - New numerical score
 * @returns {Promise<Object>} API response payload
 */
export async function adminUpdateScore(userId, newHighScore) {
  // Store or retrieve your admin key
  // (For this mock setup, we use 'admin-secret-key' as configured in routes/admin.js)
  const token = localStorage.getItem('adminToken') || 'admin-secret-key';

  const response = await fetch('/api/admin/highscore', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      userId: userId,
      newHighScore: Number(newHighScore)
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to update high score.');
  }

  return data;
}
