import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Box } from '../Box';

describe('Box', () => {
  it('renders without crashing', () => {
    expect(() => render(<Box />)).not.toThrow();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Box>
        <Text>hello</Text>
      </Box>,
    );
    expect(getByText('hello')).toBeTruthy();
  });

  it('applies a spacing key as a pixel value in the style', () => {
    const { getByTestId } = render(<Box testID="box" marginTop="sm" />);
    expect(getByTestId('box')).toHaveStyle({ marginTop: 8 });
  });

  it('applies multiple spacing keys', () => {
    const { getByTestId } = render(<Box testID="box" padding="md" marginBottom="lg" />);
    expect(getByTestId('box')).toHaveStyle({ padding: 16, marginBottom: 24 });
  });

  it('resolves a top-level color path for backgroundColor', () => {
    const { getByTestId } = render(<Box testID="box" backgroundColor="background" />);
    expect(getByTestId('box')).toHaveStyle({ backgroundColor: '#ffffff' });
  });

  it('resolves a borderRadius token', () => {
    const { getByTestId } = render(<Box testID="box" borderRadius="md" />);
    expect(getByTestId('box')).toHaveStyle({ borderRadius: 16 });
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <Box marginTop="sm" paddingHorizontal="md" backgroundColor="ground" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
