import { render } from '@testing-library/react-native';
import { ListsScreen } from './ListsScreen';

describe('ListsScreen', () => {
  it('renders the screen name', () => {
    const { getByText } = render(<ListsScreen />);
    expect(getByText('Lists')).toBeTruthy();
  });
});
