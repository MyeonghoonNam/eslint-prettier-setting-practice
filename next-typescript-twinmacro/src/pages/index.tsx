import { useState } from 'react';
import { Header, Counter } from '@/components';

const Home = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Header text="Home" />
      <Counter count={value} />

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
