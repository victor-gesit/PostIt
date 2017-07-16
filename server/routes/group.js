import express from 'express';
import groupController from '../controllers/group';

const router = express.Router();

router.post('/', groupController.create);
router.post('/:id/user', groupController.adduser);
router.post('/:id/message', groupController.postmessage);
router.get('/:id/messages', groupController.getmessages);

// Get group members
router.get('/:id/members', groupController.getmembers);

export default router;
