import { useState } from 'react';
import tw, { css } from 'twin.macro';

import { Header } from '@/components';

const Home = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Header text="Home" />

      <h2>max value === 3</h2>
      <span
        css={[
          tw`text-[36px] block`,
          css`
            color: ${value === 3 && 'hotpink'};
          `,
        ]}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => setValue((prev) => prev + 1)}
        className="text-[36px] bolder-[1px]"
      >
        +
      </button>

      <button
        type="button"
        onClick={() => setValue((prev) => prev - 1)}
        className="text-[36px]"
      >
        -
      </button>
    </div>
  );
};

export default Home;
