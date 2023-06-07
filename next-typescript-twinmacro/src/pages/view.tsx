import { Header, Counter, Button } from '@/components';

import type { HomeProps } from './types';

const VHome = ({
  count,
  incrementCount,
  decrementCount,
  incrementDisabled,
  decrementDisabled,
}: HomeProps) => {
  return (
    <div>
      <Header text="Home" />
      <Counter count={count} />
      <Button
        text="Plus"
        onClick={incrementCount}
        disabled={incrementDisabled}
      />
      <Button
        text="Minus"
        onClick={decrementCount}
        disabled={decrementDisabled}
      />
    </div>
  );
};

export default VHome;
