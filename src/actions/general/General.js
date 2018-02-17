import * as ActionTypes from "../ActionTypes";

export const toggleSideMenu = (sideMenuState) => ({
    type: ActionTypes.SET_SIDE_MENU_STATE,
    sideMenuState: !sideMenuState
});

export const showNotification = (showNotification, message) => ({
    type: ActionTypes.SHOW_NOTIFICATION,
    showNotification,
    message
});