import { Header, Counter, Button } from '@/components';
import { useCount } from '@/hooks';
import { MAXIMUM_VALUE, MINIMUM_VALUE } from '@/constants/Counter';

const Home = () => {
  const { count, incrementCount, decrementCount } = useCount(0);

  return (
    <div>
      <Header text="Home" />
      <Counter count={count} />
      <Button
        text="Plus"
        onClick={incrementCount}
        disabled={count === MAXIMUM_VALUE}
      />
      <Button
        text="Minus"
        onClick={decrementCount}
        disabled={count === MINIMUM_VALUE}
      />
    </div>
  );
};

export default Home;
