const Task = require('../models/Task');

async function listTasks(userId, query) {
  const { page = 1, limit = 5, title, status, priority, sortBy = 'createdAt', order = 'desc' } = query;
  const filters = { userId };
  if (title) filters.$text = { $search: title };
  if (status) filters.status = status;
  if (priority) filters.priority = priority;

  const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Task.find(filters).sort(sort).skip(skip).limit(limit),
    Task.countDocuments(filters),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

async function getTaskById(userId, id) {
  const task = await Task.findOne({ _id: id, userId });
  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }
  return task;
}

async function createTask(userId, payload) {
  const task = await Task.create({ ...payload, userId });
  return task;
}

async function updateTask(userId, id, payload) {
  const task = await Task.findOneAndUpdate({ _id: id, userId }, { $set: payload }, { new: true });
  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }
  return task;
}

async function deleteTask(userId, id) {
  const task = await Task.findOneAndDelete({ _id: id, userId });
  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }
  return { success: true };
}

async function updateTaskStatus(userId, id, status) {
  const task = await Task.findOneAndUpdate({ _id: id, userId }, { $set: { status } }, { new: true });
  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    throw error;
  }
  return task;
}

module.exports = {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};



