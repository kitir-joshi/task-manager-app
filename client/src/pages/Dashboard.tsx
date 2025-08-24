import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Plus, CheckSquare, Clock, AlertTriangle, Users } from 'lucide-react';
import axios from 'axios';

interface TaskStats {
  statusStats: Array<{ _id: string; count: number }>;
  priorityStats: Array<{ _id: string; count: number }>;
  overdueTasks: number;
  totalTasks: number;
}

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useQuery<TaskStats>('taskStats', async () => {
    const response = await axios.get('/api/tasks/stats/overview');
    return response.data;
  });

  const getStatusCount = (status: string) => {
    return stats?.statusStats.find(s => s._id === status)?.count || 0;
  };

  const getPriorityCount = (priority: string) => {
    return stats?.priorityStats.find(p => p._id === priority)?.count || 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your tasks.</p>
        </div>
        <Link
          to="/tasks"
          className="btn btn-primary btn-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks */}
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalTasks || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.overdueTasks || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{getStatusCount('in-progress')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckSquare className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{getStatusCount('completed')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Task Status</h3>
            <p className="card-description">Distribution of tasks by status</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">To Do</span>
                </div>
                <span className="text-sm text-gray-600">{getStatusCount('todo')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">In Progress</span>
                </div>
                <span className="text-sm text-gray-600">{getStatusCount('in-progress')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">Review</span>
                </div>
                <span className="text-sm text-gray-600">{getStatusCount('review')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <span className="text-sm text-gray-600">{getStatusCount('completed')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Task Priority</h3>
            <p className="card-description">Distribution of tasks by priority</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">Low</span>
                </div>
                <span className="text-sm text-gray-600">{getPriorityCount('low')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">Medium</span>
                </div>
                <span className="text-sm text-gray-600">{getPriorityCount('medium')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">High</span>
                </div>
                <span className="text-sm text-gray-600">{getPriorityCount('high')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                  <span className="text-sm font-medium">Urgent</span>
                </div>
                <span className="text-sm text-gray-600">{getPriorityCount('urgent')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
          <p className="card-description">Common tasks and shortcuts</p>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/tasks"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5 text-primary-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Create Task</p>
                <p className="text-sm text-gray-600">Add a new task</p>
              </div>
            </Link>
            <Link
              to="/tasks?status=in-progress"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Clock className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">In Progress</p>
                <p className="text-sm text-gray-600">View active tasks</p>
              </div>
            </Link>
            <Link
              to="/profile"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Profile</p>
                <p className="text-sm text-gray-600">Manage your account</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
