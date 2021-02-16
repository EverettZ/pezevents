import * as fromBusiness from '../reducers/business.reducer';
import { selectBusinessState } from './business.selectors';

describe('Business Selectors', () => {
  it('should select the feature state', () => {
    const result = selectBusinessState({
      [fromBusiness.businessFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
