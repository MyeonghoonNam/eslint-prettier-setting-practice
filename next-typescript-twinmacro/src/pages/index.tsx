import { useState } from 'react';
import { Header, Counter, Button } from '@/components';

const Home = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Header text="Home" />
      <Counter count={value} />
      <Button text="Plus" />
      <Button text="Minus" />
    </div>
  );
};

export default Home;
