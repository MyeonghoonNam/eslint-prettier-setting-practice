import { render, screen } from '@testing-library/react';
import { Counter } from '@/components';
import { CONTAINER_ID } from '@/constants/Counter';

describe('Counter Component', () => {
  it('Render', () => {
    const count = 0;

    render(<Counter count={count} />);

    const container = screen.getByTestId(CONTAINER_ID);

    expect(container).toBeInTheDocument();
    expect(container.textContent).toBe(String(count));
  });
});
