import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number; 
}

export const Timer: React.FC<TimerProps> = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div>
      <h2>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</h2>
    </div>
  );
};
