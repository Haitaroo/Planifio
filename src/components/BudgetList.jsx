import React, { useState } from 'react';
import { Card, CardContent, Typography, LinearProgress, Box, Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { motion } from 'framer-motion';
import ExpenseForm from './ExpenseForm';
import ExpenseHistory from './ExpenseHistory';
import ExpenseChart from './ExpenseChart';

const COUNTRY_CURRENCIES = {
  US: '$',
  UK: '£',
  CA: '$',
  FR: '€',
};

const getProgressColor = (percentage) => {
  if (percentage > 0.66) return 'success';
  if (percentage > 0.33) return 'warning';
  return 'error';
};

export default function BudgetList({ budgets, onExpenseAdded, onBudgetUpdated }) {
  const [editingBudget, setEditingBudget] = useState(null);
  const [newLimit, setNewLimit] = useState('');
  const [showJsonDialog, setShowJsonDialog] = useState(false);
  const [currentBudgetJson, setCurrentBudgetJson] = useState('');

  const handleAddExpense = (budgetId, newExpense) => {
    const updatedBudget = budgets.find(budget => budget.id === budgetId);
    const updatedExpenses = [...updatedBudget.expenses, newExpense];
    const updatedRemainingBudget = updatedBudget.remainingBudget - newExpense.taxedAmount;
    
    const updatedBudgetData = {
      ...updatedBudget,
      expenses: updatedExpenses,
      remainingBudget: updatedRemainingBudget
    };
    
    onExpenseAdded(budgetId, newExpense);
    onBudgetUpdated(budgetId, updatedBudgetData);
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setNewLimit(budget.limit.toString());
  };

  const handleUpdateBudget = () => {
    const updatedBudget = {
      ...editingBudget,
      limit: parseFloat(newLimit),
      remainingBudget: parseFloat(newLimit) - (editingBudget.limit - editingBudget.remainingBudget)
    };
    onBudgetUpdated(editingBudget.id, updatedBudget);
    setEditingBudget(null);
  };

  const handleShowJson = (budget) => {
    const budgetJson = JSON.stringify(budget, null, 2);
    setCurrentBudgetJson(budgetJson);
    setShowJsonDialog(true);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(currentBudgetJson);
  };

  return (
    <Grid container spacing={3}>
      {budgets.map(budget => {
        const remainingPercentage = budget.remainingBudget / budget.limit;
        const progressColor = getProgressColor(remainingPercentage);
        const currencySymbol = COUNTRY_CURRENCIES[budget.country] || '€';

        return (
          <Grid item xs={12} key={budget.id}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {budget.name}
                  </Typography>
                  <Button variant="outlined" size="small" onClick={() => handleShowJson(budget)} sx={{ mb: 2 }}>
                    Afficher JSON
                  </Button>
                  <Typography variant="body1" gutterBottom>
                    Limite: {budget.limit} {currencySymbol}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Restant: {budget.remainingBudget.toFixed(2)} {currencySymbol}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={remainingPercentage * 100} 
                    color={progressColor}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Button onClick={() => handleEditBudget(budget)} sx={{ mt: 2 }}>
                    Modifier le budget
                  </Button>
                  <ExpenseForm budget={budget} onExpenseAdded={handleAddExpense} onBudgetUpdated={onBudgetUpdated} />
                  <ExpenseChart expenses={budget.expenses} currencySymbol={currencySymbol} />
                  <ExpenseHistory expenses={budget.expenses} currencySymbol={currencySymbol} />
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        );
      })}
      <Dialog open={!!editingBudget} onClose={() => setEditingBudget(null)}>
        <DialogTitle>Modifier le budget</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nouvelle limite"
            type="number"
            fullWidth
            value={newLimit}
            onChange={(e) => setNewLimit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingBudget(null)}>Annuler</Button>
          <Button onClick={handleUpdateBudget}>Mettre à jour</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showJsonDialog} onClose={() => setShowJsonDialog(false)}>
        <DialogTitle>
          JSON du Budget
          <Tooltip title="Copier le JSON">
            <IconButton onClick={handleCopyJson} size="small" sx={{ ml: 1 }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent>
          <pre>{currentBudgetJson}</pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowJsonDialog(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}