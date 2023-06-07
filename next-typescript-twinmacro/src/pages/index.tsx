import { Header, Counter, Button } from '@/components';
import { useCount } from '@/hooks';

const Home = () => {
  const { count, incrementCount, decrementCount } = useCount(0);

  return (
    <div>
      <Header text="Home" />
      <Counter count={count} />
      <Button text="Plus" onClick={incrementCount} />
      <Button text="Minus" onClick={decrementCount} />
    </div>
  );
};

export default Home;
