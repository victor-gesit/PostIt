import express from 'express';
import generalController from '../controllers/general';
import userController from '../controllers/user';
import tokenValidator from '../auth/tokenValidator';


const router = express.Router();

// Validate token before accessing these routes;

// Load all registered members with offset and limit;
router.get('/members', tokenValidator.validateToken, generalController.getallusers);

// Load all created groups with offset and limit
router.get('/groups', tokenValidator.validateToken, generalController.getAllGroups);
// Verify token, useful for react components that
// require authentication before they can be accessed
router.use('/token', tokenValidator.validateToken, userController.getUserInfo);
// Search for users
router.use('/search', tokenValidator.validateToken, generalController.searchForUsers);
// Password recovery
router.post('/password/recover', generalController.receiveEmail);
router.post('/password/reset', generalController.resetPassword);
// Give sensible response for random routes
router.use('/*', (req, res) => {
  res.status(404).send({ message: 'Api up and running. Check documentation for appropriate routes' });
});

export default router;
