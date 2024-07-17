import { RootState } from "../Store";

export const selectViewType = (state: RootState) => {
    return state.globalData.viewType
}

export const selectEventUpserterOpenedStatus = (state: RootState) => {
    return state.globalData.isEventUpserterOpened
}

export const selectListCreatorOpenedStatus = (state: RootState) => {
    return state.globalData.isListCreatorOpened
}

export const selectEventsViewerOpenedStatus = (state: RootState) => {
    return state.globalData.isEventsViewerOpened
}