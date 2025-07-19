import { IntervalInput } from './IntervalInput';
import styles from './WeeklyOptions.module.css';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

type WeeklyOptionsProps = {
  interval: number;
  onIntervalChange: (interval: number) => void;
  selectedDays: Set<number>;
  onSelectedDaysChange: (days: Set<number>) => void;
};

export function WeeklyOptions({ interval, onIntervalChange, selectedDays, onSelectedDaysChange }: WeeklyOptionsProps) {
  const handleDayClick = (index: number) => {
    const newSelectedDays = new Set(selectedDays);
    newSelectedDays.has(index) ? newSelectedDays.delete(index) : newSelectedDays.add(index);
    onSelectedDaysChange(newSelectedDays);
  };

  return (
    <div>
      <IntervalInput interval={interval} onIntervalChange={onIntervalChange} unit="week" />
      <p className={styles.label}>Repeat on</p>
      <div className={styles.daySelector}>
        {days.map((day, index) => (
          <button
            key={index}
            className={`${styles.dayButton} ${selectedDays.has(index) ? styles.active : ''}`}
            onClick={() => handleDayClick(index)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}