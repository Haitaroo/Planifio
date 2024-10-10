import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import BudgetCreationForm from './BudgetCreationForm';
import BudgetList from './BudgetList';

export default function Dashboard() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, [currentUser]);

  async function fetchBudgets() {
    setLoading(true);
    try {
      const budgetsRef = collection(db, 'budgets');
      const q = query(budgetsRef, where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const fetchedBudgets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBudgets(fetchedBudgets);
    } catch (error) {
      setError('Failed to fetch budgets: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button onClick={() => setShowBudgetForm(true)}>Create New Budget</Button>
      </div>
      {showBudgetForm && (
        <BudgetCreationForm
          onBudgetCreated={() => {
            setShowBudgetForm(false);
            fetchBudgets();
          }}
        />
      )}
      <BudgetList budgets={budgets} onBudgetUpdated={fetchBudgets} />
    </>
  );
}