import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Stack } from '../Stack';

describe('Stack', () => {
  it('renders without crashing', () => {
    expect(() => render(<Stack />)).not.toThrow();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Stack>
        <Text>hello</Text>
      </Stack>,
    );
    expect(getByText('hello')).toBeTruthy();
  });

  it('defaults to vertical layout', () => {
    const { getByTestId } = render(<Stack testID="stack" />);
    expect(getByTestId('stack')).toHaveStyle({ flexDirection: 'column' });
  });

  it('applies horizontal direction', () => {
    const { getByTestId } = render(<Stack testID="stack" direction="horizontal" />);
    expect(getByTestId('stack')).toHaveStyle({ flexDirection: 'row' });
  });

  it('applies default gap of md (16)', () => {
    const { getByTestId } = render(<Stack testID="stack" />);
    expect(getByTestId('stack')).toHaveStyle({ gap: 16 });
  });

  it('applies a custom gap token', () => {
    const { getByTestId } = render(<Stack testID="stack" gap="xl" />);
    expect(getByTestId('stack')).toHaveStyle({ gap: 32 });
  });

  it('applies spacing props', () => {
    const { getByTestId } = render(<Stack testID="stack" padding="lg" marginTop="sm" />);
    expect(getByTestId('stack')).toHaveStyle({ padding: 24, marginTop: 8 });
  });
});
