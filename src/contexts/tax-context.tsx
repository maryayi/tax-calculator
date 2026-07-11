import { useState, type PropsWithChildren } from 'react';
import { TaxContext, type TaxResult } from './use-tax-context';

export const TaxContextProvider = ({ children }: PropsWithChildren) => {
  const [result, setResult] = useState<TaxResult | null>(null);

  return (
    <TaxContext.Provider value={{ result, setResult }}>
      {children}
    </TaxContext.Provider>
  );
};
