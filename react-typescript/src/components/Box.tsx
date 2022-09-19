import styled from '@emotion/styled';

export interface IProps {
	width?: number;
	height?: number;
	backgroundColor?: string;
}

const Container = styled.div<IProps>`
	width: ${(props) => `${props.width}px`};
	height: ${(props) => `${props.height}px`};
	background-color: ${(props) => props.backgroundColor};
`;

function Box({ width = 100, height = 100, backgroundColor = 'red' }: IProps) {
	return (
		<Container
			width={width}
			height={height}
			backgroundColor={backgroundColor}
		/>
	);
}

export default Box;
