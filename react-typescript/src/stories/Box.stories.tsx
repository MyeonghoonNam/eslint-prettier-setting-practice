import Box, { IProps } from '@components/Box';

export default {
	title: 'Components/Box',
	component: Box,
	argTypes: {
		width: { control: 'number' },
		height: { control: 'number' },
		backgroundColor: { control: 'color' },
	},
};

export function Default(args: IProps) {
	return <Box {...args} />;
}
