import express from 'express';
import groupController from '../controllers/group';
import tokenValidator from '../auth/tokenValidator';

const router = express.Router();
// Validate token
router.use(tokenValidator.validateToken);

router.post('/', groupController.create);
router.post('/:id/user', groupController.addUser);
router.post('/:id/message', groupController.postMessage);

// Get all messages with offset and limit
router.get('/:id/messages/:offset/:limit', groupController.getMessages);
// Get all messages with offset only
router.get('/:id/messages/:offset', groupController.getMessages);
// Get all messages
router.get('/:id/messages', groupController.getMessages);

// Get group members with offset and limit
router.get('/:id/members/:offset/:limit', groupController.getMembers);
// Get group members with offset only
router.get('/:id/members/:offset', groupController.getMembers);
// See who has read a message
router.get('/:id/message/seenby', groupController.seenBy);
// Get group members (all)
router.get('/:id/members', groupController.getMembers);

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
