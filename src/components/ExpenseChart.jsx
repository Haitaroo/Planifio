import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Typography, Box, Paper } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function ExpenseChart({ expenses, currencySymbol }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const groupedExpenses = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Non catégorisé';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.taxedAmount;
    return acc;
  }, {});

  const data = Object.entries(groupedExpenses).map(([category, amount], index) => ({
    name: category,
    value: amount,
    color: COLORS[index % COLORS.length]
  }));

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6" gutterBottom align="center">
        Répartition des dépenses par catégorie
      </Typography>
      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={index === activeIndex ? '#fff' : 'none'}
                  strokeWidth={index === activeIndex ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <Box bgcolor="background.paper" p={2} border="1px solid" borderColor="grey.300">
                      <Typography variant="body2">{data.name}</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {currencySymbol}{data.value.toFixed(2)}
                      </Typography>
                    </Box>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box mt={2}>
        {data.map((entry, index) => (
          <Typography key={index} variant="body2" style={{ color: entry.color }}>
            <Box
              component="span"
              display="inline-block"
              width={12}
              height={12}
              bgcolor={entry.color}
              mr={1}
              style={{ verticalAlign: 'middle' }}
            />
            {entry.name}: {currencySymbol}{entry.value.toFixed(2)} ({((entry.value / expenses.reduce((sum, e) => sum + e.taxedAmount, 0)) * 100).toFixed(2)}%)
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}