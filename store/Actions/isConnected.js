import { CHANGE_CONNECTION_STATUS } from './actionType';

export const isConnected = (status) => {
    return {
        type: CHANGE_CONNECTION_STATUS,
        isConnected: status
    };
};