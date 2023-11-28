import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';
import { type TaxFormType } from '../components/TaxForm';
import { type CalculateOutputType } from '../core/calculate-tax';

type ContextType = {
  input: TaxFormType;
  setInput: React.Dispatch<React.SetStateAction<TaxFormType>>;
  output: CalculateOutputType;
  setOutput: React.Dispatch<React.SetStateAction<CalculateOutputType>>;
};

const defaultContextValue = {
  input: {
    salary: 0,
    period: 'monthly',
    currency: 'IRT',
    year: '1402',
  } as TaxFormType,
  setInput: () => {},
  output: {
    totalTax: 0,
    totalPercent: 0,
    steps: [],
  },
  setOutput: () => {},
};

const TaxContext = createContext<ContextType>(defaultContextValue);

export const TaxContextProvider = ({ children }: PropsWithChildren) => {
  const [taxOutputValue, setTaxOutputValue] = useState<CalculateOutputType>(
    defaultContextValue.output
  );

  const [taxInputValue, setTaxInputValue] = useState<TaxFormType>(
    defaultContextValue.input
  );

  return (
    <TaxContext.Provider
      value={{
        input: taxInputValue,
        setInput: setTaxInputValue,
        output: taxOutputValue,
        setOutput: setTaxOutputValue,
      }}
    >
      {children}
    </TaxContext.Provider>
  );
};

export const useTaxContext = () => {
  return useContext(TaxContext);
};
