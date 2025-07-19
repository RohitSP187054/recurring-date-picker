import { addDays, addWeeks, getDay, isAfter, startOfDay } from 'date-fns';

export type RecurrenceConfig = {
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  interval: number;
  startDate: Date;
  weekly?: {
    selectedDays: Set<number>; 
  };
};

export function calculateRecurringDates(config: RecurrenceConfig): Date[] {
  const dates: Date[] = [];
  let currentDate = startOfDay(config.startDate);

  const fiveYearsFromStart = addDays(config.startDate, 365 * 5);

  if (config.frequency === 'Daily') {
    while (dates.length < 200 && currentDate <= fiveYearsFromStart) {
      dates.push(currentDate);
      currentDate = addDays(currentDate, config.interval);
    }
  }

  if (config.frequency === 'Weekly' && config.weekly) {

    currentDate = addDays(currentDate, 0); 
    
    while (dates.length < 200 && currentDate <= fiveYearsFromStart) {

      config.weekly.selectedDays.forEach(dayIndex => {
        let potentialDate = addDays(currentDate, dayIndex - getDay(currentDate));
        if (!isAfter(currentDate, potentialDate)) {
            dates.push(potentialDate);
        }
      });
      currentDate = addWeeks(currentDate, config.interval);
    }
  }

  return dates.filter(date => !isAfter(config.startDate, date)).slice(0, 200);
}