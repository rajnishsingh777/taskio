const express = require('express');
const { requireAuth } = require('../middleware/auth.middleware');
const {
  handleListTasks,
  handleGetTask,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
  handleUpdateStatus,
} = require('../controllers/tasks.controller');

const router = express.Router();

router.use(requireAuth);

router.get('/', handleListTasks);
router.post('/', handleCreateTask);
router.get('/:id', handleGetTask);
router.put('/:id', handleUpdateTask);
router.delete('/:id', handleDeleteTask);
router.patch('/:id/status', handleUpdateStatus);

module.exports = router;



