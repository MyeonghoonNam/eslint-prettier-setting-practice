import VButton from './view';

import type { ButtonProps } from './types';

const Button = ({ text, onClick }: ButtonProps) => {
  const props = {
    text,
    onClick,
  };

  return <VButton {...props} />;
};

export default Button;
