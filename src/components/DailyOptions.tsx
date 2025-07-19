import { IntervalInput } from './IntervalInput';

type DailyOptionsProps = {
  interval: number;
  onIntervalChange: (interval: number) => void;
};

export function DailyOptions({ interval, onIntervalChange }: DailyOptionsProps) {
  return (
    <IntervalInput
      interval={interval}
      onIntervalChange={onIntervalChange}
      unit="day"
    />
  );
}