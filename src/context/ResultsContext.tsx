"use client"

import React, { createContext, useState, ReactNode } from 'react';
import { SearchResultType } from '@/types/results';

type ResultsContextType = {
  results: SearchResultType | null;
  setResults: React.Dispatch<React.SetStateAction<SearchResultType | null>>;
};

const defaultState: ResultsContextType = {
  results: null,
  setResults: () => {},
};

export const ResultsContext = createContext<ResultsContextType>(defaultState);

export const ResultsProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<SearchResultType | null>(null);

  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  );
};
