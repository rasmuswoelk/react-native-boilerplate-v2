import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Container } from '../Container';

describe('Container', () => {
  it('renders without crashing', () => {
    expect(() => render(<Container />)).not.toThrow();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Container>
        <Text>content</Text>
      </Container>,
    );
    expect(getByText('content')).toBeTruthy();
  });

  it('applies the gutter spacing token as horizontal padding by default', () => {
    const { getByTestId } = render(<Container testID="c" />);
    expect(getByTestId('c')).toHaveStyle({ paddingHorizontal: 12 });
  });

  it('applies gutter spacing when gutter={true}', () => {
    const { getByTestId } = render(<Container testID="c" gutter={true} />);
    expect(getByTestId('c')).toHaveStyle({ paddingHorizontal: 12 });
  });

  it('omits horizontal padding when gutter={false}', () => {
    const { getByTestId } = render(<Container testID="c" gutter={false} />);
    expect(getByTestId('c')).not.toHaveStyle({ paddingHorizontal: 12 });
  });

  it('accepts a spacing key string for gutter', () => {
    const { getByTestId } = render(<Container testID="c" gutter="md" />);
    expect(getByTestId('c')).toHaveStyle({ paddingHorizontal: 16 });
  });

  it('passes extra BoxProps through', () => {
    const { getByTestId } = render(<Container testID="c" marginTop="lg" />);
    expect(getByTestId('c')).toHaveStyle({ marginTop: 24 });
  });
});
