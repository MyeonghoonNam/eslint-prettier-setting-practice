import { useCount } from '@/hooks';
import { MAXIMUM_VALUE, MINIMUM_VALUE } from '@/constants/Counter';

import VHome from './view';

const Home = () => {
  const { count, incrementCount, decrementCount } = useCount(0);

  const props = {
    count,
    incrementCount,
    decrementCount,
    incrementDisabled: count === MAXIMUM_VALUE,
    decrementDisabled: count === MINIMUM_VALUE,
  };

  return <VHome {...props} />;
};

export default Home;
