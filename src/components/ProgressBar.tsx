import React from 'react';
import { Box, Typography } from '@mui/material';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestion, totalQuestions, timeLeft }) => {
  return (
    <Box mb={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="div">Тестирование</Typography>
        <Box display="flex" alignItems="center" p={1} border={1} borderRadius="4px">
          <Typography variant="body2" color="textSecondary">{`Время: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}</Typography>
        </Box>
      </Box>
      <Box display="flex" mt={2}>
        {[...Array(totalQuestions)].map((_, index) => (
          <Box
            key={index}
            flexGrow={1}
            height="8px"
            bgcolor={index < currentQuestion ? 'black' : index === currentQuestion ? 'red' : 'lightgrey'}
            mx={0.5}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProgressBar;