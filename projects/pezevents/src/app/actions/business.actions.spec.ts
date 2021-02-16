import * as fromBusiness from './business.actions';

describe('loadBusinesss', () => {
  it('should return an action', () => {
    expect(fromBusiness.loadBusinesss().type).toBe('[Business] Load Businesss');
  });
});
