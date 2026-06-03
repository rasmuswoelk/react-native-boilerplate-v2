import { act } from 'react';
import { useCounterStore } from '../useCounterStore';

const { getState } = useCounterStore;

beforeEach(() => {
  act(() => {
    useCounterStore.setState({ count: 0 });
  });
});

describe('useCounterStore', () => {
  it('starts at 0', () => {
    expect(getState().count).toBe(0);
  });

  it('increments', () => {
    act(() => getState().increment());
    expect(getState().count).toBe(1);
  });

  it('decrements', () => {
    act(() => {
      getState().increment();
      getState().decrement();
    });
    expect(getState().count).toBe(0);
  });

  it('resets', () => {
    act(() => {
      getState().increment();
      getState().increment();
      getState().reset();
    });
    expect(getState().count).toBe(0);
  });
});
