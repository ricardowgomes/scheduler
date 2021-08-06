import { useState } from 'react';

const useVisualMode = (inicialMode) => {
  const [history, setHistory] = useState([inicialMode]);

  const transition = (newMode, replace = false) => {
    const currentHistory = [...history];

    if (replace) {
      currentHistory.pop();
      currentHistory.push(newMode);

    } else {
      currentHistory.push(newMode);
    }
    setHistory(currentHistory);
  };

  const back = () => {
    if (history.length < 2) return;

    const currentHistory = [...history];
    currentHistory.pop();

    setHistory(currentHistory);
  }

  return { mode: history[history.length - 1], transition, back }
};

export default useVisualMode;