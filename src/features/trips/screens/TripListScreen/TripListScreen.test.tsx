import { render } from '@testing-library/react-native';
import { TripListScreen } from './TripListScreen';

describe('TripListScreen', () => {
  it('renders the screen name', () => {
    const { getByText } = render(<TripListScreen />);
    expect(getByText('Trips')).toBeTruthy();
  });
});
