import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Employees.css';

const Employees = () => {
  const { logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    email: '',
    department: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newEmployee)
      });
      if (response.ok) {
        const employee = await response.json();
        setEmployees([...employees, employee]);
        setNewEmployee({ name: '', position: '', email: '', department: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  if (loading) {
    return <div className="employees">Loading employees...</div>;
  }

  return (
    <div className="employees">
      <header className="page-header">
        <h1>Employees</h1>
        <div className="header-actions">
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : 'Add Employee'}
          </button>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <nav className="dashboard-nav">
        <a href="/dashboard">Dashboard</a>
        <a href="/employees" className="active">Employees</a>
        <a href="/tasks">Tasks</a>
      </nav>
      
      {showForm && (
        <form onSubmit={handleAddEmployee} className="employee-form">
          <h2>Add New Employee</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position:</label>
              <input
                type="text"
                id="position"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                id="department"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-submit">Add Employee</button>
        </form>
      )}
      
      <div className="employees-list">
        <h2>All Employees</h2>
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <table className="employees-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Employees;