import createStore from 'amo/store';

describe('amo createStore', () => {
  it('sets the reducers', () => {
    const { store } = createStore();
    expect(Object.keys(store.getState()).sort()).toEqual([
      'addons',
      'api',
      'auth',
      'categories',
      'errorPage',
      'errors',
      'featured',
      'infoDialog',
      'installations',
      'landing',
      'loadingBar',
      'reduxAsyncConnect',
      'reviews',
      'search',
      'viewContext',
    ]);
  });

  it('creates an empty store', () => {
    const { store } = createStore();
    expect(store.getState().addons).toEqual({});
  });
});
