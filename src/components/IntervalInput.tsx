import styles from './IntervalInput.module.css';

type IntervalInputProps = {
  interval: number;
  onIntervalChange: (interval: number) => void;
  unit: string; //'day', 'week', 'month'
};

export function IntervalInput({ interval, onIntervalChange, unit }: IntervalInputProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Every</p>
      <input
        type="number"
        min="1"
        value={interval}
        onChange={(e) => onIntervalChange(parseInt(e.target.value, 10))}
        className={styles.numberInput}
      />
      <p className={styles.label}>{unit}(s)</p>
    </div>
  );
}