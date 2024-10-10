import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const COUNTRY_CURRENCIES = {
  US: '$',
  UK: '£',
  CA: '$',
  FR: '€',
};

export default function BudgetCreationForm({ onBudgetCreated }) {
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const getCurrencySymbol = () => COUNTRY_CURRENCIES[country] || '€';

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!name || !limit || !country) {
      setError('Oups ! 😅 Veuillez remplir tous les champs');
      return;
    }

    const newBudget = {
      id: Date.now().toString(),
      name,
      limit: parseFloat(limit),
      country,
      remainingBudget: parseFloat(limit),
      categories: [],
      expenses: []
    };

    onBudgetCreated(newBudget);
    
    // Réinitialiser les champs après la création
    setName('');
    setLimit('');
    setCountry('');
  }

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Typography variant="h4" gutterBottom align="center">
        🌟 Créer un Nouveau Budget 🌟
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nom du Budget"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Pays</InputLabel>
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <MenuItem value="">
              <em>Choisissez un pays</em>
            </MenuItem>
            <MenuItem value="US">🇺🇸 États-Unis</MenuItem>
            <MenuItem value="UK">🇬🇧 Royaume-Uni</MenuItem>
            <MenuItem value="CA">🇨🇦 Canada</MenuItem>
            <MenuItem value="FR">🇫🇷 France</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label={`Limite de Dépenses (${getCurrencySymbol()})`}
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          margin="normal"
          required
          inputProps={{ min: "0", step: "0.01" }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth size="large" style={{ marginTop: '16px' }}>
          🚀 Créer le Budget
        </Button>
        {error && (
          <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
            {error}
          </Typography>
        )}
      </form>
    </motion.div>
  );
}