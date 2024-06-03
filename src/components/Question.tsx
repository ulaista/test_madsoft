import React from 'react';
import useTestStore from '../store/useTestStore';
import { Box, RadioGroup, FormControlLabel, Radio, Checkbox, TextField, Typography } from '@mui/material';
import { Question as QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
}

export const Question: React.FC<QuestionProps> = ({ question }) => {
  const { setAnswer, answers } = useTestStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (question.type === 'multiple') {
      const newAnswers = answers[question.id] || [];
      if (event.target.checked) {
        setAnswer(question.id, [...newAnswers, value]);
      } else {
        setAnswer(question.id, newAnswers.filter((answer: string) => answer !== value));
      }
    } else {
      setAnswer(question.id, value);
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h6">{question.text}</Typography>
      {question.type === 'single' && question.options && (
        <RadioGroup onChange={handleChange} value={answers[question.id] || ''}>
          {question.options.map((option) => (
            <FormControlLabel key={option.id} value={option.text} control={<Radio />} label={option.text} />
          ))}
        </RadioGroup>
      )}
      {question.type === 'multiple' && question.options && (
        question.options.map((option) => (
          <FormControlLabel
            key={option.id}
            control={<Checkbox onChange={handleChange} value={option.text} checked={answers[question.id]?.includes(option.text) || false} />}
            label={option.text}
          />
        ))
      )}
      {question.type === 'short' && (
        <TextField onChange={handleChange} value={answers[question.id] || ''} fullWidth />
      )}
      {question.type === 'long' && (
        <TextField onChange={handleChange} multiline rows={4} value={answers[question.id] || ''} fullWidth />
      )}
    </Box>
  );
};