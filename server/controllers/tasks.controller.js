const {
  createTaskSchema,
  updateTaskSchema,
  listTasksSchema,
  updateStatusSchema,
} = require('../validators/task.validator');
const {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require('../services/tasks.service');

async function handleListTasks(req, res) {
  const { error, value } = listTasksSchema.validate(req.query, { abortEarly: false, stripUnknown: true });
  if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });
  const data = await listTasks(req.user.userId, value);
  return res.status(200).json(data);
}

async function handleGetTask(req, res) {
  const task = await getTaskById(req.user.userId, req.params.id);
  return res.status(200).json(task);
}

async function handleCreateTask(req, res) {
  const { error, value } = createTaskSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });
  const task = await createTask(req.user.userId, value);
  return res.status(201).json(task);
}

async function handleUpdateTask(req, res) {
  const { error, value } = updateTaskSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });
  const task = await updateTask(req.user.userId, req.params.id, value);
  return res.status(200).json(task);
}

async function handleDeleteTask(req, res) {
  const result = await deleteTask(req.user.userId, req.params.id);
  return res.status(200).json(result);
}

async function handleUpdateStatus(req, res) {
  const { error, value } = updateStatusSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });
  const task = await updateTaskStatus(req.user.userId, req.params.id, value.status);
  return res.status(200).json(task);
}

module.exports = {
  handleListTasks,
  handleGetTask,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
  handleUpdateStatus,
};



