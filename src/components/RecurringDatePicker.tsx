import { useState, useEffect } from 'react';
import { FrequencyTabs } from './FrequencyTabs';
import { DailyOptions } from './DailyOptions';
import { WeeklyOptions } from './WeeklyOptions';
import { MonthlyOptions } from './MonthlyOptions';
import { YearlyOptions } from './YearlyOptions';
import { CalendarPreview } from './CalendarPreview';
import { calculateRecurringDates, type RecurrenceConfig } from '../utils/date-logic';
import styles from './RecurringDatePicker.module.css';

const formatDateForInput = (date: Date) => date.toISOString().split('T')[0];

export function RecurringDatePicker() {
  // All our state now lives in the main component
  const [frequency, setFrequency] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Yearly'>('Weekly');
  const [interval, setInterval] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedWeekDays, setSelectedWeekDays] = useState<Set<number>>(new Set([1])); // Monday selected by default
  const [recurringDates, setRecurringDates] = useState<Date[]>([]);

  // This useEffect hook runs our calculation function whenever a setting changes
  useEffect(() => {
    const config: RecurrenceConfig = {
      frequency,
      interval,
      startDate,
      weekly: { selectedDays: selectedWeekDays },
    };
    const dates = calculateRecurringDates(config);
    setRecurringDates(dates);
  }, [frequency, interval, startDate, selectedWeekDays]);

  const renderFrequencyOptions = () => {
    if (frequency === 'Daily') {
      return <DailyOptions interval={interval} onIntervalChange={setInterval} />;
    }
    if (frequency === 'Weekly') {
      return (
        <WeeklyOptions
          interval={interval}
          onIntervalChange={setInterval}
          selectedDays={selectedWeekDays}
          onSelectedDaysChange={setSelectedWeekDays}
        />
      );
    }
    if (frequency === 'Monthly') return <MonthlyOptions />;
    if (frequency === 'Yearly') return <YearlyOptions />;
    return null;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Recurring Event</h2>
      <FrequencyTabs activeFrequency={frequency} onFrequencyChange={(freq) => setFrequency(freq as any)} />
      <div className={styles.optionsContainer}>{renderFrequencyOptions()}</div>
      <div className={styles.divider}></div>
      <div className={styles.dateRangeContainer}>
        <label className={styles.dateLabel}>Starts on</label>
        <input
          type="date"
          value={formatDateForInput(startDate)}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className={styles.dateInput}
        />
      </div>
      <div className={styles.divider}></div>
      <CalendarPreview highlightedDates={recurringDates} />
    </div>
  );
}