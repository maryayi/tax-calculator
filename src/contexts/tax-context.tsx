import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';
import { type TaxFormType } from '../components/TaxForm';
import { type CalculateOutputType } from '../core/calculate-tax';

export type TaxResult = {
  input: TaxFormType;
  output: CalculateOutputType;
};

type ContextType = {
  result: TaxResult | null;
  setResult: React.Dispatch<React.SetStateAction<TaxResult | null>>;
};

const TaxContext = createContext<ContextType>({
  result: null,
  setResult: () => {},
});

export const TaxContextProvider = ({ children }: PropsWithChildren) => {
  const [result, setResult] = useState<TaxResult | null>(null);

  return (
    <TaxContext.Provider value={{ result, setResult }}>
      {children}
    </TaxContext.Provider>
  );
};

export const useTaxContext = () => {
  return useContext(TaxContext);
};
