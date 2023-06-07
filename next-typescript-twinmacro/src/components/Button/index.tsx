import VButton from './view';

import type { ButtonProps } from './types';

const Button = ({ text, disabled, onClick }: ButtonProps) => {
  const props = {
    text,
    disabled,
    onClick,
  };

  return <VButton {...props} />;
};

export default Button;
