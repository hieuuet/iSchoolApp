import { combineReducers } from 'redux';
import currentUserReducer from './userInforReducer';
import childIndexReducer from './childIndexReducer';

const reducer = combineReducers({
    userInfor: currentUserReducer,
    childIndex : childIndexReducer
});

export default reducer;
