import * as fromUserBusinesses from './user-businesses.actions';

describe('loadUserBusinessess', () => {
  it('should return an action', () => {
    expect(fromUserBusinesses.loadUserBusinessess().type).toBe('[UserBusinesses] Load UserBusinessess');
  });
});
