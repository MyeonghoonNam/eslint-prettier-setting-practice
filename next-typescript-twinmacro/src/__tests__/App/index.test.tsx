import { render, screen, renderHook, act } from '@testing-library/react';

import Home from '@/pages';
import { useCount } from '@/hooks';

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

  it('increment button click the button when it is not the maximum value', () => {
    const initialState = 0;
    const { result } = renderHook(() => useCount(initialState));

    act(() => {
      result.current.incrementCount();
    });

    expect(result.current.count).toBe(initialState + 1);
  });

  it('decrement button click the button when it is not the maximum value', () => {
    const initialState = 5;
    const { result } = renderHook(() => useCount(initialState));

    act(() => {
      result.current.decrementCount();
    });

    expect(result.current.count).toBe(initialState - 1);
  });
});
