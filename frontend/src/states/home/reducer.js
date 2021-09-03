
import { fromJS } from 'immutable';

const initState = fromJS({
});

export default (state = initState, action) => {
    const { type } = action;
    switch (type) {
        default:
            return state;
    }
};
