import express from 'express';
import {} from 'dotenv/config';
import generalController from '../controllers/general';
import tokenValidator from '../auth/tokenValidator';


const router = express.Router();

// Validate token before accessing these routes;

// Load all registered members with offset and limit;
router.use('/members/:offset/:limit', tokenValidator.validateToken, generalController.getallusers);
// Load all registered members with only offset
router.use('/members/:offset', tokenValidator.validateToken, generalController.getallusers);
// Load all registered members at once
router.use('/members', tokenValidator.validateToken, generalController.getallusers);

// Load all created groups with offset and limit
router.use('/groups/:offset/:limit', tokenValidator.validateToken, generalController.getAllGroups);
// Load all created groups with only offset
router.use('/groups/:offset', tokenValidator.validateToken, generalController.getAllGroups);
// Load all created groups at once
router.use('/groups', tokenValidator.validateToken, generalController.getAllGroups);
// Verify token, useful for react components that require authentication before they can be accessed
router.use('/token', tokenValidator.validateToken, (req, res) => {
  res.status(200).send({ success: true, message: 'Token is valid' });
});
// Give sensible response for random routes
router.use('/*', (req, res) => {
  res.status(404).send({ message: 'Api up and running. Check documentation for appropriate routes' });
});

export default router;
