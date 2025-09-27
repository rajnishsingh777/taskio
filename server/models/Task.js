const mongoose = require('mongoose');

const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES = ['pending', 'in-progress', 'completed'];

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    dueDate: { type: Date, index: true },
    priority: { type: String, enum: PRIORITIES, default: 'medium', index: true },
    status: { type: String, enum: STATUSES, default: 'pending', index: true },
  },
  { timestamps: true }
);

taskSchema.index({ title: 'text', description: 'text' });
taskSchema.index({ userId: 1, status: 1, priority: 1, dueDate: 1, createdAt: -1 });

taskSchema.virtual('isOverdue').get(function () {
  return this.dueDate ? this.dueDate < new Date() && this.status !== 'completed' : false;
});

module.exports = mongoose.model('Task', taskSchema);



