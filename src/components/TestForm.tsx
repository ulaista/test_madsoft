import React, { useEffect, useState } from 'react';
import useTestStore from '../store/useTestStore';
import { Question } from './Question';
import { Box, Button, Typography } from '@mui/material';
import ProgressBar from './ProgressBar';
import { Question as QuestionType } from '../types';

const questions: QuestionType[] = [
  {
    id: 1,
    text: 'Что должен знать фронтенд-разработчик? Назовите три ключевых технологии',
    type: 'single',
    options: [
      { id: 1, text: 'HTML, CSS и JavaScript.' },
      { id: 2, text: 'Kotlin, PHP и JavaScript.' },
      { id: 3, text: 'PHP, HTML и CSS.' },
    ],
  },
  {
    id: 2,
    text: 'Какая из этих технологий используется для создания пользовательских интерфейсов?',
    type: 'single',
    options: [
      { id: 1, text: 'React' },
      { id: 2, text: 'Node.js' },
      { id: 3, text: 'MongoDB' },
    ],
  },
  {
    id: 3,
    text: 'Какие из этих языков являются языками программирования?',
    type: 'multiple',
    options: [
      { id: 1, text: 'JavaScript' },
      { id: 2, text: 'HTML' },
      { id: 3, text: 'Python' },
    ],
  },
  {
    id: 4,
    text: 'Что такое CSS?',
    type: 'short',
  },
  {
    id: 5,
    text: 'Объясните концепцию виртуального DOM в React.',
    type: 'long',
  },
  {
    id: 6,
    text: 'Выберите фреймворки для разработки на JavaScript.',
    type: 'multiple',
    options: [
      { id: 1, text: 'Angular' },
      { id: 2, text: 'Laravel' },
      { id: 3, text: 'Vue.js' },
    ],
  },
  {
    id: 7,
    text: 'Какой из этих языков является языком разметки?',
    type: 'single',
    options: [
      { id: 1, text: 'HTML' },
      { id: 2, text: 'JavaScript' },
      { id: 3, text: 'Python' },
    ],
  },
  {
    id: 8,
    text: 'Что означает аббревиатура HTTP?',
    type: 'short',
  },
  {
    id: 9,
    text: 'Перечислите основные принципы ООП.',
    type: 'long',
  },
  {
    id: 10,
    text: 'Какие из следующих библиотек используются для управления состоянием в React?',
    type: 'multiple',
    options: [
      { id: 1, text: 'Redux' },
      { id: 2, text: 'Express' },
      { id: 3, text: 'MobX' },
    ],
  },
  {
    id: 11,
    text: 'Что такое Node.js?',
    type: 'short',
  },
  {
    id: 12,
    text: 'Какая из этих баз данных является нереляционной?',
    type: 'single',
    options: [
      { id: 1, text: 'MySQL' },
      { id: 2, text: 'MongoDB' },
      { id: 3, text: 'PostgreSQL' },
    ],
  },
  {
    id: 13,
    text: 'Объясните разницу между REST и GraphQL.',
    type: 'long',
  },
  {
    id: 14,
    text: 'Что такое npm?',
    type: 'short',
  },
  {
    id: 15,
    text: 'Выберите фреймворки для работы с Node.js.',
    type: 'multiple',
    options: [
      { id: 1, text: 'Express' },
      { id: 2, text: 'Django' },
      { id: 3, text: 'Koa' },
    ],
  },
  {
    id: 16,
    text: 'Что означает аббревиатура SQL?',
    type: 'short',
  },
];

export const TestForm: React.FC = () => {
  const { currentQuestion, nextQuestion, prevQuestion, answers, isSubmitted, submitForm, resetTest } = useTestStore();
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('timeLeft');
    return savedTime ? parseInt(savedTime) : 180;
  });
  const [timeOver, setTimeOver] = useState(() => {
    const savedTimeOver = localStorage.getItem('timeOver');
    return savedTimeOver ? JSON.parse(savedTimeOver) : false;
  });
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    const newTimer = window.setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(newTimer);
          setTimeOver(true);
          localStorage.setItem('timeOver', 'true');
          return 0;
        }
        localStorage.setItem('timeLeft', (prevTime - 1).toString());
        return prevTime - 1;
      });
    }, 1000);

    setTimer(newTimer);

    return () => clearInterval(newTimer);
  }, []);

  const handleSubmit = () => {
    submitForm();
    console.log('Test submitted');
  };

  const handleReset = () => {
    resetTest();
    localStorage.removeItem('timeLeft');
    localStorage.removeItem('timeOver');
    setTimeLeft(180);
    setTimeOver(false);

    if (timer) {
      clearInterval(timer);
    }

    const newTimer = window.setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(newTimer);
          setTimeOver(true);
          localStorage.setItem('timeOver', 'true');
          return 0;
        }
        localStorage.setItem('timeLeft', (prevTime - 1).toString());
        return prevTime - 1;
      });
    }, 1000);

    setTimer(newTimer);
  };

  const isCurrentQuestionAnswered = () => {
    const currentAnswer = answers[questions[currentQuestion].id];
    if (questions[currentQuestion].type === 'multiple') {
      return currentAnswer && currentAnswer.length > 0;
    }
    return currentAnswer !== undefined && currentAnswer !== '';
  };

  if (isSubmitted) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h4">Форма успешно отправлена!</Typography>
        <Button onClick={handleReset} variant="contained" color="primary" style={{ marginTop: '20px' }}>Пройти тест снова</Button>
      </Box>
    );
  }

  if (timeOver) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h4">Вы не успели отправить форму.</Typography>
        <Button onClick={handleReset} variant="contained" color="primary" style={{ marginTop: '20px' }}>Пройти тест снова</Button>
      </Box>
    );
  }

  if (!questions[currentQuestion]) {
    return <Typography>Question not found</Typography>;
  }

  return (
    <Box>
      <ProgressBar currentQuestion={currentQuestion} totalQuestions={questions.length} timeLeft={timeLeft} />
      <Question question={questions[currentQuestion]} />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button onClick={prevQuestion} variant="outlined" disabled={currentQuestion === 0}>Previous</Button>
        {currentQuestion === questions.length - 1 ? (
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!isCurrentQuestionAnswered()}>Submit</Button>
        ) : (
          <Button onClick={nextQuestion} variant="contained" color="primary" disabled={!isCurrentQuestionAnswered()}>Next</Button>
        )}
      </Box>
    </Box>
  );
};