import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '@/components';
import { CONTAINER_ID } from '@/constants/Button';

describe('Button Component', () => {
  it('button render', () => {
    const text = 'button text';

    const props = {
      text,
    };

    render(<Button {...props} />);

    const container = screen.getByTestId(CONTAINER_ID);

    expect(container).toBeInTheDocument();
    expect(container.textContent).toBe(text);
  });

  it('is the function called', async () => {
    const text = 'text';
    const onClick = jest.fn();

    const props = {
      text,
      onClick,
    };

    render(<Button {...props} />);

    const container = screen.getByTestId(CONTAINER_ID);

    await userEvent.click(container);

    expect(onClick).toBeCalled();
  });
});