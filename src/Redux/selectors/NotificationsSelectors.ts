import { RootState } from "../Store";

export const selectIsNotificationSent = (state: RootState) => {
    return state.notifications.isNotificationSent
}

export const selectNewNotifications = (state: RootState) => {
    return state.notifications.newNotificationsList
}