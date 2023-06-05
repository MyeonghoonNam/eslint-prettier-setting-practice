import { render, screen } from '@testing-library/react';
import { Header } from '@/components';
import { CONTAINER_ID } from '@/constants/Header';

describe('Header Component', () => {
  it('Render', () => {
    const text = 'Home';
    const props = {
      text,
    };

    render(<Header {...props} />);

    const container = screen.getByTestId(CONTAINER_ID);

    expect(container).toBeInTheDocument();
    expect(container.textContent).toBe(text);
  });
});
