import Util from '../../configs/util';

const defaultUser = null;

const currentUserReducer = (state = defaultUser, action) => {
    switch (action.type) {
        case 'CHANGE_USER_INFOR':
            return action.user;
        default:
            return state;
    }
    return state;
};

export default currentUserReducer;
