import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';

const List = ({ items, deleteItem }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
    <Box sx={{ width: '60%' }}>
      {items.map((item) => (
        <Paper key={item.id} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">{item.content}</Typography>
          <Button variant="contained" color="secondary" onClick={() => deleteItem(item.id)}>
            Delete
          </Button>
        </Paper>
      ))}
    </Box>
  </Box>
  )
}

export default List
