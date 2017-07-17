import express from 'express';
import groupController from '../controllers/group';
import tokenValidator from '../auth/tokenValidator';

const router = express.Router();
// Validate token
router.use(tokenValidator.validateToken);

router.post('/', groupController.create);
router.post('/:id/user', groupController.adduser);
router.post('/:id/message', groupController.postmessage);
router.get('/:id/messages', groupController.getmessages);

// Get group members
router.get('/:id/members', groupController.getmembers);

export default router;
