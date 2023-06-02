import tw, { css } from 'twin.macro';

interface Props {
  text: string;
}

const VButton = ({ text }: Props) => {
  return (
    <button
      type="button"
      css={[
        tw`text-[blue]`,
        css`
          font-size: 48px;
        `,
      ]}
    >
      {text}
    </button>
  );
};

export default VButton;
