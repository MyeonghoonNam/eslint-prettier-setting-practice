import tw, { css } from 'twin.macro';

import type { ButtonProps } from './types';

const VButton = ({ text, disabled, onClick }: ButtonProps) => {
  return (
    <button
      data-testid="button-container"
      type="button"
      onClick={onClick}
      disabled={disabled}
      css={[
        tw`text-[white]`,
        css`
          background: black;
          border-radius: 5px;
          margin-right: 2px;
          padding: 2px;
        `,
      ]}
    >
      {text}
    </button>
  );
};

export default VButton;
