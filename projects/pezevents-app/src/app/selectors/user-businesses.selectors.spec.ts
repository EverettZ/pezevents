import * as fromUserBusinesses from '../reducers/user-businesses.reducer';
import { selectUserBusinessesState } from './user-businesses.selectors';

describe('UserBusinesses Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUserBusinessesState({
      [fromUserBusinesses.userBusinessesFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
