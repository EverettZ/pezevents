import * as auth from './reducers/auth.reducer'
import * as business from './reducers/business.reducer'

export interface AppState {
    auth: auth.State;
  businesses: business.State;
}