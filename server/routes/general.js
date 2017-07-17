import express from 'express';
import {} from 'dotenv/config';
import generalController from '../controllers/general';
import tokenValidator from '../auth/tokenValidator';


const router = express.Router();

// Validate token before accessing this route;
router.use('/members', tokenValidator.validateToken, generalController.getallusers);
router.use('/groups', tokenValidator.validateToken, generalController.getAllGroups);
// Give sensible response for random routes
router.get('/*', (req, res) => {
  res.status(200).send({ message: 'Api up and running' });
});

export default router;
