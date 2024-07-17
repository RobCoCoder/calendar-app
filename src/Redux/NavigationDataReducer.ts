import { ThunkAction } from "redux-thunk"
import { RootState } from "./Store"
import { UnknownAction } from "redux"

const CHANGE_VIEW_SWITCH_OPENED_STATUS = "CHANGE_VIEW_SWITCH_OPENED_STATUS"

const initialState = {
    isViewSwitchOpened: false,
}

type InitialType = typeof initialState

type ChangeViewSwitchOpenedStatusActionType = {
    type: typeof CHANGE_VIEW_SWITCH_OPENED_STATUS,
    newStatus: boolean
}
export const changeViewSwitchOpenedStatusAC = (newStatus: boolean): ChangeViewSwitchOpenedStatusActionType => {
    return {
        type: "CHANGE_VIEW_SWITCH_OPENED_STATUS",
        newStatus: newStatus
    }
}

type ActionsTypes = ChangeViewSwitchOpenedStatusActionType

export const NavigationDataReducer = (state: InitialType = initialState, action: ActionsTypes) => {
    switch(action.type){
        case "CHANGE_VIEW_SWITCH_OPENED_STATUS":
            var stateCopy = {...state}
            stateCopy.isViewSwitchOpened = action.newStatus
            return stateCopy
        default: 
            return state
    }
}