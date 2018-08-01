import Util from '../../configs/util';

const defaultIndex = -1;

const childIndexReducer = (state = defaultIndex, action) => {
    switch (action.type) {
        case 'CHANGE_INDEX_CHILD':
            return action.childIndex;
        default:
            return state;
    }
    return state;
};

export default childIndexReducer;
