const SET_VIEW_TYPE = "SET_VIEW_TYPE"
const CHANGE_EVENT_UPSERTER_OPENED_STATUS = "CHANGE_EVENT_UPSERTER_OPENED_STATUS"
const CHANGE_LIST_CREATOR_OPENED_STATUS = "CHANGE_LIST_CREATOR_OPENED_STATUS"
const CHANGE_EVENTS_VIEWER_OPENED_STATUS = "CHANGE_EVENTS_VIEWER_OPENED_STATUS"

const initialState = {
    viewType: "month" as "month" | "year" | "day",
    isEventUpserterOpened: false,
    isListCreatorOpened: false,
    isEventsViewerOpened: false,
}
type initialType = typeof initialState

type SetViewTypeAction = {
    type: typeof SET_VIEW_TYPE,
    newType: "month" | "year" | "day"
}
export const setViewTypeAC = (newType: "month" | "year" | "day"): SetViewTypeAction => {
    return {
        type: SET_VIEW_TYPE,
        newType: newType
    }
}

type ChangeEventUpserterOpenedStatusActionType = {
    type: typeof CHANGE_EVENT_UPSERTER_OPENED_STATUS
    newStatus: boolean
}

export const changeEventUpserterOpenedStatusAC = (newStatus: boolean): ChangeEventUpserterOpenedStatusActionType => {
    return {
        type: "CHANGE_EVENT_UPSERTER_OPENED_STATUS",
        newStatus: newStatus
    }
}

type ChangeListCreatorOpenedStatusActionType = {
    type: typeof CHANGE_LIST_CREATOR_OPENED_STATUS,
    newStatus: boolean
}

export const changeListCreatorOpenedStatusAC = (newStatus: boolean): ChangeListCreatorOpenedStatusActionType => {
    return {
        type: "CHANGE_LIST_CREATOR_OPENED_STATUS",
        newStatus: newStatus
    }
}

type ChangeEventsViewerOpenedStatusActionType = {
    type: typeof CHANGE_EVENTS_VIEWER_OPENED_STATUS,
    newStatus: boolean
}

export const changeEventsViewerOpenedStatusAC = (newStatus: boolean): ChangeEventsViewerOpenedStatusActionType => {
    return {
        type: "CHANGE_EVENTS_VIEWER_OPENED_STATUS",
        newStatus: newStatus
    }
}

type Actions = SetViewTypeAction | ChangeEventUpserterOpenedStatusActionType | ChangeListCreatorOpenedStatusActionType | ChangeEventsViewerOpenedStatusActionType

export const GlobalDatareducer = (state: initialType = initialState, action: Actions) => {
    switch(action.type){
        case "SET_VIEW_TYPE":
            var stateCopy = {...state}
            stateCopy.viewType = action.newType
            return stateCopy
        case "CHANGE_EVENT_UPSERTER_OPENED_STATUS":
            var stateCopy = {...state}
            stateCopy.isEventUpserterOpened = action.newStatus
            return stateCopy
        case "CHANGE_LIST_CREATOR_OPENED_STATUS":
            var stateCopy = {...state}
            stateCopy.isListCreatorOpened = action.newStatus
            return stateCopy
        case "CHANGE_EVENTS_VIEWER_OPENED_STATUS":
            var stateCopy = {...state}
            stateCopy.isEventsViewerOpened = action.newStatus
            return stateCopy
        default:
            return state
    }
}