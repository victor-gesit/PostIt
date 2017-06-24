import express from 'express';
import groupController from '../controllers/group';

const router = express.Router();

router.post('/', groupController.create);
router.post('/:id/user', groupController.adduser);
router.post('/:id/message', groupController.postmessage);
router.get('/:id/messages', groupController.getmessages);

/* Additional Routes */
// Get group members
router.get('/:id/members', groupController.getmembers);
// Get groups a user belongs to
router.get('/:userId/groups', groupController.messageboard);
// Get all users registered on api, so you could select members to add to a group
router.get('/members', groupController.getallusers);
export default router;
