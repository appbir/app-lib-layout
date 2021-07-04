import immutableReducer  from 'redux-immutable-reducer';
import {combineReducers} from 'redux-immutable';
import layout from './demo/content/reducer'

const reducer = combineReducers({
  layout:immutableReducer(layout)
});

export default reducer;