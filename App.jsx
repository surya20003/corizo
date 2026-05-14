import { useState, useEffect } from 'react';
import './index.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

const API_URL = 'http://localhost:8000/api/employees';

const getApiErrorMessage = async (response, fallbackMessage) => {
  try {
    const errorData = await response.json();

    if (typeof errorData.detail === 'string') {
      return errorData.detail;
    }

    if (Array.isArray(errorData.detail)) {
      return errorData.detail.map((error) => error.msg).join(', ');
    }

    return errorData.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSaveEmployee = async (employeeData) => {
    try {
      const isEditing = !!editingEmployee;
      const url = isEditing ? `${API_URL}/${editingEmployee.id}` : API_URL;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, 'Failed to save employee'));
      }

      await fetchEmployees();
      setIsFormOpen(false);
      setEditingEmployee(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, 'Failed to delete employee'));
      }
      
      await fetchEmployees();
    } catch (err) {
      alert(err.message);
    }
  };

  const openEditForm = (employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Employee Directory</h1>
        <p>Manage your team members efficiently</p>
      </header>

      <main>
        <div className="glass-card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>All Employees</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              {employees.length} total team members
            </p>
          </div>
          <button className="btn" onClick={openCreateForm}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Employee
          </button>
        </div>

        <div className="glass-card">
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div className="loading">Loading employees...</div>
          ) : (
            <EmployeeList 
              employees={employees} 
              onEdit={openEditForm} 
              onDelete={handleDeleteEmployee} 
            />
          )}
        </div>
      </main>

      {isFormOpen && (
        <EmployeeForm 
          employee={editingEmployee} 
          onSave={handleSaveEmployee} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;
