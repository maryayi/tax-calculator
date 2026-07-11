# Tax Calculator (مالیات‌سنج)

A simple web application for calculating the income (salary) tax of Iranian employees, based on the official tax brackets announced in each year's national budget law.

**Live app:** <https://tax-calculator.aryayi.dev/>

## Features

- **Progressive bracket calculation** — computes tax step by step across the official brackets and shows how much tax each bracket contributes, plus the total tax, effective tax rate, and net (after-tax) salary.
- **Multiple fiscal years** — supports Jalali years ۱۴۰۲ through ۱۴۰۵, each with a reference link to its source. Years whose budget bill is not yet approved are clearly marked.
- **Flexible input** — enter your salary as monthly or annual, in Toman (IRT) or Rial (IRR).
- **Persian-first UI** — fully right-to-left interface with Persian digits, thousands separators, and the entered amount spelled out in words (e.g. «۵۰ میلیون تومان») to help catch typos.
- **Instant results** — the calculation updates live as you type; no submit button needed.

## How the calculation works

Iranian salary tax is progressive: each portion of your annual income is taxed at the rate of the bracket it falls into. The calculator:

1. Normalizes your input to an **annual salary in IRR** (monthly × 12, Toman × 10).
2. Walks through the year's brackets defined in [`src/core/rules.ts`](src/core/rules.ts), taxing only the slice of income inside each bracket.
3. Reports the per-bracket tax, total tax, effective rate, and net salary — converted back to your chosen currency and period.

The core logic lives in [`src/core/calculate-tax.ts`](src/core/calculate-tax.ts) and is covered by unit tests.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev server and bundling
- [Tailwind CSS](https://tailwindcss.com/) with [Headless UI](https://headlessui.com/) and [Heroicons](https://heroicons.com/)
- [Vitest](https://vitest.dev/) for testing
- [pnpm](https://pnpm.io/) as the package manager, with Husky + lint-staged pre-commit checks

## Getting started

Requires [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/).

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

### Available scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server |
| `pnpm build` | Type-check and build for production into `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm test` | Run the test suite once |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm lint` | Lint the codebase with ESLint |

## Project structure

```
src/
├── core/            # Tax calculation engine
│   ├── rules.ts     # Tax brackets per Jalali year (+ source references)
│   └── calculate-tax.ts
├── components/      # UI components (form, results, bracket steps, ...)
├── contexts/        # React context sharing form input & results
├── utils/           # Persian/Latin digit conversion, IRR/IRT, formatting
└── constants.ts
```

## Updating tax rules for a new year

When a new budget law is announced, add an entry to [`src/core/rules.ts`](src/core/rules.ts):

```ts
'1406': {
  reference: 'https://link-to-official-source',
  isApproved: false, // set true once the budget bill is approved
  steps: [
    { annualMin: 0, taxPercent: 0 },
    { annualMin: 5_000_000_000, taxPercent: 10 },
    // ...
  ],
},
```

Amounts are **annual** and in **IRR**. Each `annualMin` is the lower bound of its bracket; the bracket ends where the next one begins. The year picker, results, and references table pick up the new entry automatically.

## Deployment

Every push to `main` triggers a [GitHub Actions workflow](.github/workflows/deploy.yml) that runs the tests, builds the app, and deploys it to GitHub Pages under the custom domain `tax-calculator.aryayi.dev`.

## Disclaimer

This tool is for estimation purposes only. Tax figures come from publicly available sources (linked per year inside the app); always verify with official sources for financial decisions.

## License

[MIT](LICENSE)
