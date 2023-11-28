import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { CalculateOutputType } from '../core/calculate-tax';

type ContextType = {
  output: CalculateOutputType;
  setOutput: React.Dispatch<React.SetStateAction<CalculateOutputType>>;
};

const defaultContextValue = {
  output: {
    totalTax: 0,
    totalPercent: 0,
    steps: [],
  },
  setOutput: () => {},
};

const TaxContext = createContext<ContextType>(defaultContextValue);

export const TaxContextProvider = ({ children }: PropsWithChildren) => {
  const [contextValue, setContextValue] = useState<CalculateOutputType>(
    defaultContextValue.output
  );

  return (
    <TaxContext.Provider
      value={{ output: contextValue, setOutput: setContextValue }}
    >
      {children}
    </TaxContext.Provider>
  );
};

export const useTaxContext = () => {
  return useContext(TaxContext);
};
