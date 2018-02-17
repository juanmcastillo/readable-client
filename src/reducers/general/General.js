import * as ActionTypes from '../../actions/ActionTypes';

const general = (state = {}, action) => {
    switch (action.type) {

        case ActionTypes.SET_SIDE_MENU_STATE:
            const { sideMenuState } = action;

            return {
                ...state,
                sideMenuState
            };
        
        case ActionTypes.SHOW_NOTIFICATION:
            const { showNotification, message } = action;

            return {
                ...state,
                showNotification,
                notification: message
            };

        default:
            return {
                sideMenuState: false,
                showNotification: false,
                notification: ''
            };
    }
}

export default general;