import { act } from 'react';
import { __clearStore } from '../../../__mocks__/react-native-mmkv';
import { usePreferencesStore } from '../usePreferencesStore';

const { getState } = usePreferencesStore;

beforeEach(() => {
  __clearStore();
  act(() => {
    usePreferencesStore.setState({
      onboardingCompleted: false,
      notificationsEnabled: true,
    });
  });
});

describe('usePreferencesStore', () => {
  it('has correct defaults', () => {
    expect(getState().onboardingCompleted).toBe(false);
    expect(getState().notificationsEnabled).toBe(true);
  });

  it('completes onboarding', () => {
    act(() => getState().completeOnboarding());
    expect(getState().onboardingCompleted).toBe(true);
  });

  it('toggles notifications', () => {
    act(() => getState().setNotificationsEnabled(false));
    expect(getState().notificationsEnabled).toBe(false);
  });

  it('resets to defaults', () => {
    act(() => {
      getState().completeOnboarding();
      getState().setNotificationsEnabled(false);
      getState().reset();
    });
    expect(getState().onboardingCompleted).toBe(false);
    expect(getState().notificationsEnabled).toBe(true);
  });
});
