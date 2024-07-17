const ADD_NEW_NOTIFICATIONS = "ADD_NEW_NOTIFICATIONS"
const CLEAR_NEW_NOTIFICATIONS = "CLEAR_NEW_NOTIFICATIONS"

type NotificationType = {
    type: "Error" | "Event",
    eventList: string | null, //null when type is "Error", otherwise it cant be null
    name: string,
    description: string,
    URLs: Array<string> | null
}

const initialState = {
    isNotificationSent: false, /**If there are any new notifications */
    newNotificationsList: [
        // {type: "Error", eventList: null, name: "form error", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac ante leo. Proin vitae lorem nec libero scelerisque viverra. Pellentesque varius erat nec maximus ornare. Maecenas ut sagittis est. Mauris in ante luctus, dapibus mauris nec, accumsan neque. Maecenas eget turpis sollicitudin, ultrices massa id, cursus lorem. In in mi non neque vehicula finibus. Vivamus condimentum porttitor enim, vitae pellentesque metus. Phasellus ut diam eu magna suscipit mollis in et dolor. Ut quis congue tellus, eget congue eros. Mauris sed lacus interdum, pretium urna in, gravida diam. Aliquam neque velit, efficitur et erat in, varius congue nisl. Donec ante neque, pellentesque quis est non, mollis imperdiet est. Pellentesque malesuada suscipit scelerisque.", URLs: ["https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv"]},
        // {type: "Error", eventList: null, name: "form error", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac ante leo. Proin vitae lorem nec libero scelerisque viverra. Pellentesque varius erat nec maximus ornare. Maecenas ut sagittis est. Mauris in ante luctus, dapibus mauris nec, accumsan neque. Maecenas eget turpis sollicitudin, ultrices massa id, cursus lorem. In in mi non neque vehicula finibus. Vivamus condimentum porttitor enim, vitae pellentesque metus. Phasellus ut diam eu magna suscipit mollis in et dolor. Ut quis congue tellus, eget congue eros. Mauris sed lacus interdum, pretium urna in, gravida diam. Aliquam neque velit, efficitur et erat in, varius congue nisl. Donec ante neque, pellentesque quis est non, mollis imperdiet est. Pellentesque malesuada suscipit scelerisque.", URLs: ["https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv"]},
        // {type: "Error", eventList: null, name: "form error", description: "", URLs: ["https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv"]},
        // {type: "Error", eventList: null, name: "form error", description: "total message", URLs: ["https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv"]},
        // {type: "Error", eventList: null, name: "form error", description: "total message", URLs: null},
        // {type: "Event", eventList: "study", name: "my birthday", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac ante leo. Proin vitae lorem nec libero scelerisque viverra. Pellentesque varius erat nec maximus ornare. Maecenas ut sagittis est. Mauris in ante luctus, dapibus mauris nec, accumsan neque. Maecenas eget turpis sollicitudin, ultrices massa id, cursus lorem. In in mi non neque vehicula finibus. Vivamus condimentum porttitor enim, vitae pellentesque metus. Phasellus ut diam eu magna suscipit mollis in et dolor. Ut quis congue tellus, eget congue eros.", URLs: ["https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv", "https://music.youtube.com/watch?v=Vi4mvEIPtbs&list=PLkRGcRzOMEcuJ2l5s8bincoyCSokGK_tv"]},
        // {type: "Error", eventList: null, name: "form error", description: "total message", URLs: null},
    ] as Array<NotificationType>
}

type InitialType = typeof initialState

type AddNewNotificationsActionType = {
    type: typeof ADD_NEW_NOTIFICATIONS
    notificationsList: Array<NotificationType>
}

export const addNewNotifications = (notificationsList: Array<NotificationType>): AddNewNotificationsActionType => {
    return {
        type: "ADD_NEW_NOTIFICATIONS",
        notificationsList: notificationsList
    }
}

type ClearNewNotificationsActionType = {
    type: typeof CLEAR_NEW_NOTIFICATIONS
}

export const clearNewNotificationsAC = (): ClearNewNotificationsActionType => {
    return {
        type: "CLEAR_NEW_NOTIFICATIONS"
    }
}

type ActionsTypes = AddNewNotificationsActionType | ClearNewNotificationsActionType
export const NotificationsReducer = (state: InitialType = initialState, action: ActionsTypes) => {
    switch(action.type){
        case "ADD_NEW_NOTIFICATIONS":
            var stateCopy = {...state}
            stateCopy.isNotificationSent = true
            stateCopy.newNotificationsList = [...state.newNotificationsList]
            for(let i = 0; i < action.notificationsList.length; i++)
                stateCopy.newNotificationsList.push(action.notificationsList[i])
            return stateCopy
        case "CLEAR_NEW_NOTIFICATIONS":
            var stateCopy = {...state}
            stateCopy.isNotificationSent = false
            stateCopy.newNotificationsList = []
            return stateCopy
        default:
            return state
    }
}