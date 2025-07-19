import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import styles from './CalendarPreview.module.css';

type CalendarPreviewProps = {
  highlightedDates: Date[];
};

export function CalendarPreview({ highlightedDates }: CalendarPreviewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => (
    <div className={styles.header}>
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&lt;</button>
      <span>{format(currentMonth, 'MMMM yyyy')}</span>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</button>
    </div>
  );

  const renderDaysOfWeek = () => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return (
      <div className={styles.daysOfWeek}>
        {days.map(day => <div key={day}>{day}</div>)}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className={styles.cells}>
        {days.map((day, i) => (
          <div
            key={i}
            className={`
              ${styles.cell}
              ${!isSameMonth(day, monthStart) ? styles.disabled : ''}
              ${highlightedDates.some(hDate => isSameDay(day, hDate)) ? styles.highlighted : ''}
            `}
          >
            <span>{format(day, 'd')}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.calendar}>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </div>
  );
}