import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { RootState } from "./Store"
import { searchFormAPI } from "../api/api"
import { changeYearMonthAC, changeYearMonthDayAC } from "./DatesReducer"
import { setViewTypeAC } from "./GlobalDataReducer"

const CHANGE_SEARCH_OPENED_STATUS = "CHANGE_SEARCH_OPENED_STATUS"
const CHANGE_SEARCH_FETCHING_STATUS = "CHANGE_SEARCH_FETCHING_STATUS"
const CHANGE_SEARCH_FAILED_STATUS = "CHANGE_SEARCH_FAILED_STATUS"

const initialState = {
    isSearchOpened: false,
    isFetching: false,
    isFailed: false,
}

type initialType = typeof initialState

type ChangeSearchOpenedStatusActionType = {
    type: typeof CHANGE_SEARCH_OPENED_STATUS
    newStatus: boolean
}

export const chanegSearchOpenedStatusAC = (newStatus: boolean): ChangeSearchOpenedStatusActionType => {
    return {
        type: CHANGE_SEARCH_OPENED_STATUS,
        newStatus: newStatus
    }
}

type ChangeSearchFetchingStatusActionType = {
    type: typeof CHANGE_SEARCH_FETCHING_STATUS,
    newStatus: boolean
}
export const changeSearchFetchingStatusAC = (newStatus: boolean): ChangeSearchFetchingStatusActionType => {
    return {
        type: CHANGE_SEARCH_FETCHING_STATUS,
        newStatus: newStatus
    }
}

type ChangeSearchFailedStatusActionType = {
    type: typeof CHANGE_SEARCH_FAILED_STATUS,
    newStatus: boolean
}
export const changeSearchFailedStatusAC = (newStatus: boolean) => {
    return {
        type: CHANGE_SEARCH_FAILED_STATUS,
        newStatus: newStatus
    }
}

type ActionsTypes = ChangeSearchFetchingStatusActionType | ChangeSearchOpenedStatusActionType | ChangeSearchFailedStatusActionType

export const searchDateTC = (currentLanguage: string, year: number, monthName?: string, dayOfTheMonth?: number): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async(dispatch: Dispatch) => {
    dispatch(changeSearchFetchingStatusAC(true))
    if(!monthName) {}
    else if(!dayOfTheMonth){ //switching the year and month
        const response = await searchFormAPI.checkSearchForm(currentLanguage, year, monthName)
        if(response.resultCode === 0){
            dispatch(changeSearchFetchingStatusAC(false))
            dispatch(chanegSearchOpenedStatusAC(false))
            dispatch(setViewTypeAC("month"))
            dispatch(changeYearMonthAC(year, response.data.monthIndex+1)) //1-12
        }
        else {
            dispatch(changeSearchFailedStatusAC(true))
        }
    }
    else{ //switching the year, month, and day
        const response = await searchFormAPI.checkSearchForm(currentLanguage, year, monthName, dayOfTheMonth)
        if(response.resultCode === 0){
            dispatch(changeSearchFetchingStatusAC(false))
            dispatch(chanegSearchOpenedStatusAC(false))
            dispatch(setViewTypeAC("day"))
            dispatch(changeYearMonthDayAC(year, response.data.monthIndex+1, dayOfTheMonth)) //1-12
        }
        else {
            dispatch(changeSearchFailedStatusAC(true))
        }
    }
}

export const SearchDataReducer = (state: initialType = initialState, action: ActionsTypes) => {
    switch(action.type){
        case "CHANGE_SEARCH_OPENED_STATUS": 
            var stateCopy = {...state}
            stateCopy.isSearchOpened = action.newStatus
            return stateCopy
        case "CHANGE_SEARCH_FETCHING_STATUS":
            var stateCopy = {...state} 
            stateCopy.isFetching = action.newStatus
            return stateCopy
        case "CHANGE_SEARCH_FAILED_STATUS":
            var stateCopy = {...state}
            stateCopy.isFailed = action.newStatus
            return stateCopy
        default:
            return state
    }
}