import { createContext, useContext } from 'react';
import { type TaxFormType } from '../constants';
import { type CalculateOutputType } from '../core/calculate-tax';

export type TaxResult = {
  input: TaxFormType;
  output: CalculateOutputType;
};

type ContextType = {
  result: TaxResult | null;
  setResult: React.Dispatch<React.SetStateAction<TaxResult | null>>;
};

export const TaxContext = createContext<ContextType>({
  result: null,
  setResult: () => {},
});

export const useTaxContext = () => {
  return useContext(TaxContext);
};
