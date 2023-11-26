const rules = {
  '1402': {
    isApproved: true,
    steps: [
      {
        annualMin: 0, // IRR
        taxPercent: 0,
      },
      {
        annualMin: 1_200_000_000,
        taxPercent: 10,
      },
      {
        annualMin: 1_680_000_000,
        taxPercent: 15,
      },
      {
        annualMin: 2_760_000_000,
        taxPercent: 20,
      },
      {
        annualMin: 4_080_000_000,
        taxPercent: 30,
      },
    ],
  },
  '1403': {
    isApproved: false,
    steps: [
      {
        annualMin: 0, // IRR
        taxPercent: 0,
      },
      {
        annualMin: 1_200_000_000,
        taxPercent: 10,
      },
      {
        annualMin: 1_680_000_000,
        taxPercent: 15,
      },
      {
        annualMin: 2_760_000_000,
        taxPercent: 20,
      },
      {
        annualMin: 4_080_000_000,
        taxPercent: 30,
      },
    ],
  },
} as const;

export default rules;
