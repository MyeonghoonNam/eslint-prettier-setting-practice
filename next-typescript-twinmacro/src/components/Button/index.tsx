import VButton from './view';

interface Props {
  text: string;
}

const Button = ({ text }: Props) => {
  const props = {
    text,
  };

  return <VButton {...props} />;
};

export default Button;
