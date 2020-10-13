import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import lscache from 'lscache'

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>,
];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const storageValue = lscache.get(key);

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    lscache.set(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;