import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Task from '../models/Task';
import User from '../models/User';

const router = express.Router();

// Get all tasks with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['todo', 'in-progress', 'review', 'completed']),
  query('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  query('assignedTo').optional().isMongoId(),
  query('search').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 10,
      status,
      priority,
      assignedTo,
      search
    } = req.query;

    const filter: any = {};

    // Add filters
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;

    // Search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'username email avatar')
      .populate('createdBy', 'username email')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Task.countDocuments(filter);

    res.json({
      tasks,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'username email avatar')
      .populate('createdBy', 'username email')
      .populate('comments.user', 'username avatar');

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Create new task
router.post('/', [
  body('title').notEmpty().trim().isLength({ max: 200 }),
  body('description').notEmpty().trim().isLength({ max: 2000 }),
  body('status').optional().isIn(['todo', 'in-progress', 'review', 'completed']),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('assignedTo').isMongoId(),
  body('dueDate').optional().isISO8601(),
  body('tags').optional().isArray(),
  body('estimatedHours').optional().isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      status = 'todo',
      priority = 'medium',
      assignedTo,
      dueDate,
      tags = [],
      estimatedHours
    } = req.body;

    // Verify assigned user exists
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(400).json({ error: 'Assigned user not found' });
    }

    const task = new Task({
      title,
      description,
      status,
      priority,
      assignedTo,
      createdBy: req.user._id,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags,
      estimatedHours
    });

    await task.save();

    const populatedTask = await Task.findById(task._id)
      .populate('assignedTo', 'username email avatar')
      .populate('createdBy', 'username email');

    res.status(201).json({
      message: 'Task created successfully',
      task: populatedTask
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task
router.put('/:id', [
  body('title').optional().trim().isLength({ max: 200 }),
  body('description').optional().trim().isLength({ max: 2000 }),
  body('status').optional().isIn(['todo', 'in-progress', 'review', 'completed']),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('assignedTo').optional().isMongoId(),
  body('dueDate').optional().isISO8601(),
  body('tags').optional().isArray(),
  body('estimatedHours').optional().isFloat({ min: 0 }),
  body('actualHours').optional().isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if user can update this task
    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this task' });
    }

    const updateData = { ...req.body };
    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'username email avatar')
     .populate('createdBy', 'username email')
     .populate('comments.user', 'username avatar');

    res.json({
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if user can delete this task
    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Add comment to task
router.post('/:id/comments', [
  body('text').notEmpty().trim().isLength({ max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const comment = {
      user: req.user._id,
      text: req.body.text,
      createdAt: new Date()
    };

    task.comments.push(comment);
    await task.save();

    const updatedTask = await Task.findById(req.params.id)
      .populate('assignedTo', 'username email avatar')
      .populate('createdBy', 'username email')
      .populate('comments.user', 'username avatar');

    res.json({
      message: 'Comment added successfully',
      task: updatedTask
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get task statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Task.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: 'completed' }
    });

    const totalTasks = await Task.countDocuments();

    res.json({
      statusStats: stats,
      priorityStats,
      overdueTasks,
      totalTasks
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
