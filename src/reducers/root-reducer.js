import { combineReducers } from 'redux';
import { houseReducer } from './houseReducer';

const rootReducer = combineReducers({
  houseData: houseReducer
});


export default rootReducer;
