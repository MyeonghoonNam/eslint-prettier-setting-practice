import tw, { css } from 'twin.macro';

import type { ButtonProps } from './types';

const VButton = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      data-testid="button-container"
      type="button"
      onClick={onClick}
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
