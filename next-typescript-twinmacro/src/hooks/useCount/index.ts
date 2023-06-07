import { useState, useCallback } from 'react';

import type { InitialState } from './types';

const useCount = (initialState: InitialState) => {
  const [count, setCount] = useState(initialState);

  const incrementCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrementCount = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  return { count, incrementCount, decrementCount };
};

export default useCount;
