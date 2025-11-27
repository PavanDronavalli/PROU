import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Tasks.css';

const Tasks = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: ''
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchEmployees()]);
      setLoading(false);
    };
    loadData();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      let url = 'http://localhost:5000/api/tasks';
      if (filter !== 'all') {
        url += `?status=${filter}`;
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setTasks(data);
      return Promise.resolve();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return Promise.resolve();
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setEmployees(data);
      return Promise.resolve();
    } catch (error) {
      console.error('Error fetching employees:', error);
      return Promise.resolve();
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newTask)
      });
      if (response.ok) {
        const task = await response.json();
        setTasks([...tasks, task]);
        setNewTask({ title: '', description: '', assignedTo: '', dueDate: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(task => 
          task._id === taskId ? updatedTask : task
        ));
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (loading) {
    return <div className="tasks">Loading tasks...</div>;
  }

  return (
    <div className="tasks">
      <header className="page-header">
        <h1>Tasks</h1>
        <div className="header-actions">
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : 'Add Task'}
          </button>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <nav className="dashboard-nav">
        <a href="/dashboard">Dashboard</a>
        <a href="/employees">Employees</a>
        <a href="/tasks" className="active">Tasks</a>
      </nav>
      
      <div className="filters">
        <label>Filter by status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      {showForm && (
        <form onSubmit={handleAddTask} className="task-form">
          <h2>Add New Task</h2>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="assignedTo">Assigned To:</label>
            <select
              id="assignedTo"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
              required
            >
              <option value="">Select an employee</option>
              {employees.map(employee => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            />
          </div>
          <button type="submit" className="btn-submit">Add Task</button>
        </form>
      )}
      
      <div className="tasks-list">
        <h2>Tasks ({filteredTasks.length})</h2>
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.assignedTo?.name || 'Unassigned'}</td>
                  <td>
                    <select 
                      value={task.status} 
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                      className={`status-select ${task.status}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button 
                      onClick={() => updateTaskStatus(task._id, 
                        task.status === 'completed' ? 'pending' : 'completed')}
                      className="status-btn"
                    >
                      {task.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Tasks;