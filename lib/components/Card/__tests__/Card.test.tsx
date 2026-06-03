import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '../Card';

jest.mock('@/src/theme/fonts', () => ({
  fontMapper: {
    primary: {
      regular: { normal: 'Font_400Regular', italic: 'Font_400Regular_Italic' },
      bold: { normal: 'Font_700Bold', italic: 'Font_700Bold_Italic' },
      black: { normal: 'Font_900Black', italic: 'Font_900Black_Italic' },
      light: { normal: 'Font_300Light', italic: 'Font_300Light_Italic' },
      medium: { normal: 'Font_500Medium', italic: 'Font_500Medium_Italic' },
    },
  },
  availableFontKeys: {},
  fonts: {},
}));

describe('Card', () => {
  it('renders without crashing', () => {
    expect(() => render(<Card />)).not.toThrow();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Card>
        <Text>card content</Text>
      </Card>,
    );
    expect(getByText('card content')).toBeTruthy();
  });

  it('renders a string title', () => {
    const { getByText } = render(<Card title="My Card" />);
    expect(getByText('My Card')).toBeTruthy();
  });

  it('renders a ReactNode title', () => {
    const { getByText } = render(<Card title={<Text>Custom title</Text>} />);
    expect(getByText('Custom title')).toBeTruthy();
  });

  it('does not render a title element when title is omitted', () => {
    const { queryByText } = render(<Card />);
    expect(queryByText('My Card')).toBeNull();
  });

  it('passes BoxProps through to the container', () => {
    const { getByTestId } = render(<Card testID="card" />);
    expect(getByTestId('card')).toBeTruthy();
  });
});
