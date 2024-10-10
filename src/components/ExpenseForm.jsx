import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { motion } from 'framer-motion';

const TAX_RATES = {
  US: 0.1,
  UK: 0.2,
  CA: 0.15,
  FR: 0.2,
};

const COUNTRY_CURRENCIES = {
  US: '$',
  UK: '£',
  CA: '$',
  FR: '€',
};

export default function ExpenseForm({ budget, onExpenseAdded, onBudgetUpdated }) {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const currencySymbol = COUNTRY_CURRENCIES[budget.country] || '€';

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const expenseAmount = parseFloat(amount);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      setError('Oups ! 😅 Veuillez entrer un montant de dépense valide');
      return;
    }

    if (!name.trim()) {
      setError('Oups ! 😅 Veuillez entrer un nom pour la dépense');
      return;
    }

    const taxRate = TAX_RATES[budget.country] || 0;
    const taxedAmount = expenseAmount * (1 + taxRate);

    if (taxedAmount > budget.remainingBudget) {
      setError('Oh non ! 😱 La dépense dépasse le budget restant');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      name,
      amount: expenseAmount,
      taxedAmount: taxedAmount,
      category,
      date: new Date().toISOString()
    };

    onExpenseAdded(budget.id, newExpense);
    setAmount('');
    setName('');
    setCategory('');
  }

  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      const updatedBudget = {
        ...budget,
        categories: [...budget.categories, newCategory.trim()]
      };
      onBudgetUpdated(budget.id, updatedBudget);
      setCategory(newCategory.trim());
      setNewCategory('');
      setShowNewCategoryDialog(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>
          📝 Ajouter une dépense
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nom de la Dépense"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label={`Montant de la Dépense (${currencySymbol})`}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            required
            inputProps={{ min: "0.01", step: "0.01" }}
            variant="outlined"
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Catégorie</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Catégorie"
            >
              <MenuItem value="">
                <em>Aucune catégorie</em>
              </MenuItem>
              {budget.categories.map((cat, index) => (
                <MenuItem key={index} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" color="secondary" onClick={() => setShowNewCategoryDialog(true)}>
              Ajouter une nouvelle catégorie
            </Button>
            <Button variant="contained" color="primary" type="submit">
              💾 Ajouter la Dépense
            </Button>
          </Box>
          {error && (
            <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
              {error}
            </Typography>
          )}
        </form>
      </Paper>
      <Dialog open={showNewCategoryDialog} onClose={() => setShowNewCategoryDialog(false)}>
        <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de la nouvelle catégorie"
            type="text"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewCategoryDialog(false)}>Annuler</Button>
          <Button onClick={handleAddNewCategory} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}