import styles from './FrequencyTabs.module.css';

type FrequencyTabsProps = {
  activeFrequency: string;
  onFrequencyChange: (frequency: string) => void;
};

const frequencies = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

export function FrequencyTabs({ activeFrequency, onFrequencyChange }: FrequencyTabsProps) {
  return (
    <div className={styles.tabGroup}>
      {frequencies.map((freq) => (
        <button
          key={freq}
          className={`${styles.tab} ${activeFrequency === freq ? styles.active : ''}`}
          onClick={() => onFrequencyChange(freq)}
        >
          {freq}
        </button>
      ))}
    </div>
  );
}