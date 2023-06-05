import tw, { css } from 'twin.macro';

import { CONTAINER_ID } from '@/constants/Counter';

interface CounterProps {
  count: number;
}

const Counter = ({ count }: CounterProps) => {
  return (
    <span
      css={[
        tw`text-[36px] block`,
        css`
          color: ${count === 3 && 'hotpink'};
        `,
      ]}
      data-testid={CONTAINER_ID}
    >
      {count}
    </span>
  );
};

export default Counter;
