import express from 'express';
import generalController from '../controllers/general';

const router = express.Router();

// Get all users registered on api, so you could select members to add to a group
router.get('/members', generalController.getallusers);

export default router;
