import { describe, it, expect } from 'vitest';
import { calculateRecurringDates, type RecurrenceConfig } from './date-logic';

describe('calculateRecurringDates', () => {

  it('should calculate correct daily occurrences', () => {
    const config: RecurrenceConfig = {
      frequency: 'Daily',
      interval: 1,
      startDate: new Date('2025-07-20T00:00:00'),
    };
    const dates = calculateRecurringDates(config);
    
    expect(dates[0].getDate()).toBe(20);
    expect(dates[1].getDate()).toBe(21);
    expect(dates[2].getDate()).toBe(22);
  });

  it('should calculate correct daily occurrences with an interval', () => {
    const config: RecurrenceConfig = {
      frequency: 'Daily',
      interval: 3,
      startDate: new Date('2025-07-20T00:00:00'),
    };
    const dates = calculateRecurringDates(config);
    // Check if the first 3 dates are correct (20, 23, 26)
    expect(dates[0].getDate()).toBe(20);
    expect(dates[1].getDate()).toBe(23);
    expect(dates[2].getDate()).toBe(26);
  });

  it('should calculate correct weekly occurrences for one day', () => {
    const config: RecurrenceConfig = {
      frequency: 'Weekly',
      interval: 1,
      startDate: new Date('2025-07-20T00:00:00'), // A Sunday
      weekly: {
        selectedDays: new Set([1]), // Mondays only
      },
    };
    const dates = calculateRecurringDates(config);
    // Check if the first 3 dates are Mondays (July 21, 28, Aug 4)
    expect(dates[0].toISOString().slice(0, 10)).toBe('2025-07-21');
    expect(dates[1].toISOString().slice(0, 10)).toBe('2025-07-28');
    expect(dates[2].toISOString().slice(0, 10)).toBe('2025-08-04');
  });
});