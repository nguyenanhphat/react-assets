
import { fromJS } from 'immutable';
import { getTokenSession } from 'utils/common';
import * as types from './constants';

const initState = fromJS({
    accessToken: getTokenSession() || null,
    userInfo: null
});

export default (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.LOGIN_SUCCESS: {
            return state.merge({
                userInfo: payload,
                accessToken: payload.access_token
            });
        }
        case types.UPDATE_USER_INFO: {
            return state.set('userInfo', payload);
        }
        default:
            return state;
    }
};
