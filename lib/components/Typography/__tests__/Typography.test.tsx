import { render } from '@testing-library/react-native';
import { Typography } from '../Typography';

jest.mock('@/src/theme/fonts', () => ({
  fontMapper: {
    primary: {
      regular: {
        normal: 'SourceSans3_400Regular',
        italic: 'SourceSans3_400Regular_Italic',
      },
      bold: {
        normal: 'SourceSans3_700Bold',
        italic: 'SourceSans3_700Bold_Italic',
      },
      black: {
        normal: 'SourceSans3_900Black',
        italic: 'SourceSans3_900Black_Italic',
      },
      light: {
        normal: 'SourceSans3_300Light',
        italic: 'SourceSans3_300Light_Italic',
      },
      medium: {
        normal: 'SourceSans3_500Medium',
        italic: 'SourceSans3_500Medium_Italic',
      },
    },
  },
  availableFontKeys: {},
  fonts: {},
}));

describe('Typography', () => {
  it('renders without crashing', () => {
    expect(() => render(<Typography>Hello</Typography>)).not.toThrow();
  });

  it('renders its children', () => {
    const { getByText } = render(<Typography>Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('accepts a variant prop without crashing', () => {
    expect(() => render(<Typography variant="paragraph">Text</Typography>)).not.toThrow();
  });

  it('accepts a fontWeight prop without crashing', () => {
    expect(() => render(<Typography fontWeight="bold">Text</Typography>)).not.toThrow();
  });

  it('matches snapshot with variant="body"', () => {
    const { toJSON } = render(<Typography variant="body">Body text</Typography>);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot with variant="caption" and fontWeight="bold"', () => {
    const { toJSON } = render(
      <Typography variant="caption" fontWeight="bold">
        Caption
      </Typography>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
