import { CONTAINER_ID } from '@/constants/Header';

interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => {
  return <h1 data-testid={CONTAINER_ID}>{text}</h1>;
};

export default Header;
