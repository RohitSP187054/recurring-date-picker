import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecurringDatePicker } from './RecurringDatePicker';

describe('RecurringDatePicker Integration Test', () => {

  it('should display daily options when the "Daily" tab is clicked', () => {

    render(<RecurringDatePicker />);

    const dailyTabButton = screen.getByText('Daily');

    fireEvent.click(dailyTabButton);

    expect(screen.getByText('day(s)')).toBeInTheDocument();
  });

});