import express from 'express';
import groupController from '../controllers/group';
import tokenValidator from '../auth/tokenValidator';

const router = express.Router();
// Validate token
router.use(tokenValidator.validateToken);

router.post('/', groupController.create);
router.post('/:id/user', groupController.adduser);
router.post('/:id/message', groupController.postmessage);

// Get all messages with offset and limit
router.get('/:id/messages/:offset/:limit', groupController.getmessages);
// Get all messages with offset only
router.get('/:id/messages/:offset', groupController.getmessages);
// Get all messages
router.get('/:id/messages', groupController.getmessages);

// Get group members with offset and limit
router.get('/:id/members/:offset/:limit', groupController.getmembers);
// Get group members with offset only
router.get('/:id/members/:offset', groupController.getmembers);
// Get group members (all)
router.get('/:id/members', groupController.getmembers);

// Delete group members
router.delete('/:id/members', groupController.deleteMembers);

// Delete a group
router.delete('/:id/delete', groupController.deleteGroup);

// Leave a group
router.delete('/:id/leave', groupController.leaveGroup);

// Give sensible response for random routes
router.use('/*', (req, res) => {
  res.status(404).send({ message: 'Api up and running. Check documentation for appropriate routes' });
});

export default router;
