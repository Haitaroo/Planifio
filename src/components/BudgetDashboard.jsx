import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import BudgetCreationForm from './BudgetCreationForm';
import BudgetList from './BudgetList';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateUniqueIdentifier, isValidIdentifier } from '../utils/identifierGenerator';

export default function BudgetDashboard() {
  const [userName, setUserName] = useState('');
  const [budgets, setBudgets] = useState([]);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [isUserNameSubmitted, setIsUserNameSubmitted] = useState(false);
  const [retrieveBudgetString, setRetrieveBudgetString] = useState('');
  const [retrieveError, setRetrieveError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encodedData = params.get('data');
    if (encodedData) {
      const decodedData = JSON.parse(atob(encodedData));
      setUserName(decodedData.userName);
      setBudgets(decodedData.budgets);
      setIsUserNameSubmitted(true);
    }
  }, [location]);

  const updateURL = (updatedBudgets) => {
    const data = { userName, budgets: updatedBudgets };
    const encodedData = btoa(JSON.stringify(data));
    navigate(`?data=${encodedData}`, { replace: true });
  };

  const handleBudgetCreated = (newBudget) => {
    newBudget.uniqueIdentifier = generateUniqueIdentifier(newBudget);
    const updatedBudgets = [...budgets, newBudget];
    setBudgets(updatedBudgets);
    setShowBudgetForm(false);
    updateURL(updatedBudgets);
  };

  const handleExpenseAdded = (budgetId, expense) => {
    const updatedBudgets = budgets.map(budget => 
      budget.id === budgetId 
        ? { 
            ...budget, 
            remainingBudget: budget.remainingBudget - expense.taxedAmount,
            expenses: [...budget.expenses, expense],
            categories: [...new Set([...budget.categories, expense.category])],
            uniqueIdentifier: generateUniqueIdentifier({
              ...budget,
              remainingBudget: budget.remainingBudget - expense.taxedAmount,
              expenses: [...budget.expenses, expense],
              categories: [...new Set([...budget.categories, expense.category])]
            })
          }
        : budget
    );
    setBudgets(updatedBudgets);
    updateURL(updatedBudgets);
  };

  const handleBudgetUpdated = (budgetId, updates) => {
    const updatedBudgets = budgets.map(budget =>
      budget.id === budgetId 
        ? { 
            ...budget, 
            ...updates,
            uniqueIdentifier: generateUniqueIdentifier({ ...budget, ...updates })
          }
        : budget
    );
    setBudgets(updatedBudgets);
    updateURL(updatedBudgets);
  };

  const handleUserNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() !== '') {
      setIsUserNameSubmitted(true);
      updateURL(budgets);
    }
  };

  const handleRetrieveBudget = (e) => {
    e.preventDefault();
    setRetrieveError('');

    try {
      const budgetData = JSON.parse(retrieveBudgetString);
      if (!budgetData.name || !budgetData.limit || !budgetData.country) {
        throw new Error('Invalid budget data');
      }

      const newBudget = {
        id: Date.now().toString(),
        name: budgetData.name,
        limit: parseFloat(budgetData.limit),
        country: budgetData.country,
        remainingBudget: parseFloat(budgetData.remainingBudget || budgetData.limit),
        categories: budgetData.categories || [],
        expenses: budgetData.expenses || []
      };

      newBudget.uniqueIdentifier = generateUniqueIdentifier(newBudget);
      setBudgets([...budgets, newBudget]);
      setRetrieveBudgetString('');
      updateURL([...budgets, newBudget]);
    } catch (error) {
      setRetrieveError("Invalid budget data. Please check your input.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            🎉 Gestion de Budget 🎉
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Gérez vos finances avec le sourire ! 😄
          </Typography>
        </motion.div>

        {!isUserNameSubmitted ? (
          <motion.form onSubmit={handleUserNameSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <TextField
              fullWidth
              label="Votre nom"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth size="large">
              Commencer
            </Button>
          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Bienvenue, {userName} ! 👋
            </Typography>
            <Button 
              onClick={() => setShowBudgetForm(true)}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mb: 2 }}
            >
              🚀 Créer un Nouveau Budget
            </Button>
            {!showBudgetForm && budgets.length === 0 && (
              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Récupérer un Budget Existant
                </Typography>
                <form onSubmit={handleRetrieveBudget}>
                  <TextField
                    fullWidth
                    label="Données du Budget (format JSON)"
                    variant="outlined"
                    value={retrieveBudgetString}
                    onChange={(e) => setRetrieveBudgetString(e.target.value)}
                    required
                    margin="normal"
                    multiline
                    rows={4}
                  />
                  <Button type="submit" variant="contained" color="secondary" fullWidth>
                    Récupérer le Budget
                  </Button>
                </form>
                {retrieveError && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {retrieveError}
                  </Typography>
                )}
              </Paper>
            )}
          </motion.div>
        )}
      </Box>

      {showBudgetForm && (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <BudgetCreationForm onBudgetCreated={handleBudgetCreated} />
        </motion.div>
      )}

      {isUserNameSubmitted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <BudgetList 
            budgets={budgets} 
            onExpenseAdded={handleExpenseAdded} 
            onBudgetUpdated={handleBudgetUpdated}
          />
        </motion.div>
      )}
    </Container>
  );
}