import express from 'express';
import groupController from '../controllers/group';
import tokenValidator from '../auth/tokenValidator';

const router = express.Router();
// Validate token
router.use(tokenValidator.validateToken);

router.post('/', groupController.create);
router.post('/:id/user', groupController.adduser);
router.post('/:id/message', groupController.postmessage);

// Get all messages (paginated)
router.get('/:id/messages/:offset/:limit', groupController.getmessages);

// Get all messages (all)
router.get('/:id/messages', groupController.getmessages);

// Get group members (paginated)
router.get('/:id/members/:offset/:limit', groupController.getmembers);

// Get group members (all)
router.get('/:id/members', groupController.getmembers);

// Delete group members
router.delete('/:id/members', groupController.deleteMembers);

// Delete a group
router.delete('/:id/delete', groupController.deleteGroup);

export default router;
