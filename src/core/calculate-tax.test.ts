import { describe, expect, it } from 'vitest';
import calculateTax from './calculate-tax';
import rules from './rules';

describe('Testing tax calculator', () => {
  it('tax of 0 salary should be zero', () => {
    const tax = calculateTax({ salary: 0, year: '1402' });

    expect(tax).toEqual({
      steps: [],
      totalTax: 0,
      totalPercent: 0,
    });
  });
  it('tax of 1st step should be zero', () => {
    const tax = calculateTax({ salary: 1, year: '1402' });

    expect(tax).toEqual({
      steps: [
        {
          annualMin: rules[1402].steps[0].annualMin,
          taxPercent: rules[1402].steps[0].taxPercent,
          appliedTax: 0,
        },
      ],
      totalTax: 0,
      totalPercent: 0,
    });
  });

  it('tax of negative number should throw error', () => {
    const fn = () => calculateTax({ salary: -1, year: '1402' });
    expect(fn).toThrow();
  });

  it('A normal number should return a valid tax value', () => {
    const tax = calculateTax({ salary: 2_000_000_000, year: '1402' });

    expect(tax).toEqual({
      steps: [
        {
          annualMin: rules[1402].steps[0].annualMin,
          taxPercent: rules[1402].steps[0].taxPercent,
          appliedTax: 0,
        },
        {
          annualMin: rules[1402].steps[1].annualMin,
          taxPercent: rules[1402].steps[1].taxPercent,
          appliedTax: 48_000_000,
        },
        {
          annualMin: rules[1402].steps[2].annualMin,
          taxPercent: rules[1402].steps[2].taxPercent,
          appliedTax: 48_000_000,
        },
      ],
      totalTax: 96_000_000,
      totalPercent: 4.8,
    });
  });

  it('Tax of annual 1_200_000_000 IRR on 1402 should be 0', () => {
    const tax = calculateTax({ salary: 1_200_000_000, year: '1402' });

    expect(tax).toEqual({
      steps: [
        {
          annualMin: rules[1402].steps[0].annualMin,
          taxPercent: rules[1402].steps[0].taxPercent,
          appliedTax: 0,
        },
      ],
      totalTax: 0,
      totalPercent: 0,
    });
  });

  it('Tax of annual 1_680_000_000 IRR on 1402 should be 0', () => {
    const tax = calculateTax({ salary: 1_680_000_000, year: '1402' });

    expect(tax).toEqual({
      steps: [
        {
          annualMin: rules[1402].steps[0].annualMin,
          taxPercent: rules[1402].steps[0].taxPercent,
          appliedTax: 0,
        },
        {
          annualMin: rules[1402].steps[1].annualMin,
          taxPercent: rules[1402].steps[1].taxPercent,
          appliedTax: 48_000_000,
        },
      ],
      totalTax: 48_000_000,
      totalPercent: (100 * 48_000_000) / 1_680_000_000,
    });
  });
});
