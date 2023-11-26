import rules from './rules';

type InputType = {
  salary: number; // annual IRR
  year: keyof typeof rules;
};

type OutputType = {
  steps: {
    annualMin: number;
    taxPercent: number;
    appliedTax: number; // annual IRR
  }[];
  totalTax: number; // annual IRR
  totalPercent: number;
};

function calculateTax({ salary, year }: InputType): OutputType {
  const currentYearRule = rules[year];
  if (!currentYearRule) {
    throw new Error('Tax rule not found');
  }

  if (salary < 0) {
    throw new Error('Salary should be a positive number');
  }

  return currentYearRule.steps.reduce(
    (
      acc: OutputType,
      cur: (typeof currentYearRule)['steps'][number],
      index: number,
      allSteps
    ) => {
      if (salary >= cur.annualMin) {
        const nextStepIndex = Math.min(index + 1, allSteps.length - 1);
        const currentStepTax =
          ((Math.min(salary, allSteps[nextStepIndex].annualMin) -
            cur.annualMin) *
            cur.taxPercent) /
          100;
        return {
          steps: [
            ...acc.steps,
            {
              annualMin: cur.annualMin,
              taxPercent: cur.taxPercent,
              appliedTax: currentStepTax,
            },
          ],
          totalTax: acc.totalTax + currentStepTax,
          totalPercent:
            salary > 0 ? ((acc.totalTax + currentStepTax) * 100) / salary : 0,
        };
      }
      return acc;
    },
    { steps: [], totalTax: 0, totalPercent: 0 }
  );
}

export default calculateTax;
