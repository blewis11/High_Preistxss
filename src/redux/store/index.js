import { createStore } from 'redux';

import rootReducer from '../rootReducer/index';

const store = createStore(rootReducer);

export default store;
