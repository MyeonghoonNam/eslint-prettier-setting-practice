import { render, screen } from '@testing-library/react';
import Home from '@/pages';
import * as Header from '@/constants/Header';
import * as Counter from '@/constants/Counter';
import * as Button from '@/constants/Button';

describe('Home Component', () => {
  it('render', () => {
    render(<Home />);

    const header = screen.getByTestId(Header.CONTAINER_ID);
    const counter = screen.getByTestId(Counter.CONTAINER_ID);
    const button = screen.getAllByTestId(Button.CONTAINER_ID);

    expect(header).toBeInTheDocument();
    expect(counter).toBeInTheDocument();

    button.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });
});
