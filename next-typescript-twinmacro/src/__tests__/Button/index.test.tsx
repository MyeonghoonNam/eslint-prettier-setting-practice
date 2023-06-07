import { render, screen } from '@testing-library/react';

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
});
