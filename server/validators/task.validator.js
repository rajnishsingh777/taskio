const Joi = require('joi');

const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES = ['pending', 'in-progress', 'completed'];

const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().max(5000).allow(''),
  dueDate: Joi.date().optional(),
  priority: Joi.string().valid(...PRIORITIES).default('medium'),
  status: Joi.string().valid(...STATUSES).default('pending'),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).optional(),
  description: Joi.string().max(5000).allow(''),
  dueDate: Joi.date().allow(null),
  priority: Joi.string().valid(...PRIORITIES),
  status: Joi.string().valid(...STATUSES),
}).min(1);

const listTasksSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(5),
  title: Joi.string().allow(''),
  status: Joi.string().valid(...STATUSES),
  priority: Joi.string().valid(...PRIORITIES),
  sortBy: Joi.string().valid('dueDate', 'createdAt').default('createdAt'),
  order: Joi.string().valid('asc', 'desc').default('desc'),
});

const updateStatusSchema = Joi.object({
  status: Joi.string().valid(...STATUSES).required(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  listTasksSchema,
  updateStatusSchema,
};



