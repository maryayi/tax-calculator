const rules = {
  '1402': {
    reference:
      'https://www.shenasname.ir/download/50002-%D9%85%D8%A7%D9%84%DB%8C%D8%A7%D8%AA-%D8%AD%D9%82%D9%88%D9%82-%D8%B3%D8%A7%D9%84-%DB%B1%DB%B4%DB%B0%DB%B2',
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
    reference: 'https://jobvision.ir/blog/pay-raise-1403/',
    isApproved: true,
    steps: [
      {
        annualMin: 0, // IRR
        taxPercent: 0,
      },
      {
        annualMin: 1_440_000_000,
        taxPercent: 10,
      },
      {
        annualMin: 1_980_000_000,
        taxPercent: 15,
      },
      {
        annualMin: 3_240_000_000,
        taxPercent: 20,
      },
      {
        annualMin: 4_800_000_000,
        taxPercent: 30,
      },
    ],
  },
  '1404': {
    reference:
      'https://hammihanonline.ir/%D8%A8%D8%AE%D8%B4-%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF-5/23850-%D8%AC%D8%B2%D8%A6%DB%8C%D8%A7%D8%AA-%D9%85%D8%A7%D9%84%DB%8C%D8%A7%D8%AA-%D8%A8%D8%B1-%D8%AD%D9%82%D9%88%D9%82-%D8%AF%D8%B1-%D8%B3%D8%A7%D9%84',
    isApproved: false,
    steps: [
      {
        annualMin: 0, // IRR
        taxPercent: 0,
      },
      {
        annualMin: 2_880_000_000,
        taxPercent: 10,
      },
      {
        annualMin: 3_600_000_000,
        taxPercent: 15,
      },
      {
        annualMin: 4_560_000_000,
        taxPercent: 20,
      },
      {
        annualMin: 6_000_000_000,
        taxPercent: 25,
      },
      {
        annualMin: 8_000_000_000,
        taxPercent: 30,
      },
    ],
  },
} as const;

export default rules;
