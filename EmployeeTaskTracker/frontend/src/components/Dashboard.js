import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    completionRate: 0,
    totalEmployees: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Employee Task Tracker Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}!</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <nav className="dashboard-nav">
        <a href="/dashboard">Dashboard</a>
        <a href="/employees">Employees</a>
        <a href="/tasks">Tasks</a>
      </nav>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-value">{stats.totalTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <p className="stat-value">{stats.completedTasks}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress Tasks</h3>
          <p className="stat-value">{stats.inProgressTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p className="stat-value">{stats.pendingTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Completion Rate</h3>
          <p className="stat-value">{stats.completionRate}%</p>
        </div>
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p className="stat-value">{stats.totalEmployees}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;