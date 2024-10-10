import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';

export default function ExpenseHistory({ expenses, currencySymbol }) {
  if (expenses.length === 0) {
    return (
      <Typography variant="body2" align="center" color="textSecondary" style={{ marginTop: '16px' }}>
        Aucune dépense enregistrée pour le moment.
      </Typography>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <Typography variant="h6" gutterBottom style={{ marginTop: '24px' }}>
        📊 Historique des dépenses
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell align="right">Montant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map(expense => (
              <TableRow key={expense.id} hover>
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>{expense.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={expense.category || 'Non catégorisé'} 
                    color="primary" 
                    variant="outlined" 
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="bold">
                    {expense.taxedAmount.toFixed(2)} {currencySymbol}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
}