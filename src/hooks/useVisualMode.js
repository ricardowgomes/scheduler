import { useState } from 'react';

const useVisualMode = (inicialMode) => {
  const [mode, setMode] = useState(inicialMode);
  const [history, setHistory] = useState([]);

  const transition = (newMode, replace = false) => {
    const currentHistory = [...history];

    if (replace) {
      currentHistory.push(newMode);

    } else {
      currentHistory.push(mode);
      currentHistory.push(newMode);
    }
    setHistory(currentHistory);
    setMode(newMode);
  };

  const back = () => {
    if (history.length > 0) {
      const currentHistory = [...history];

      currentHistory.pop();
      const lastItem = currentHistory[currentHistory.length - 2];

      setHistory(currentHistory);
      setMode(lastItem);

    } else {
      return;
    }
  };

  return { mode, transition, back }
};

export default useVisualMode;