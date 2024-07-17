import { Action, Dispatch, UnknownAction } from "redux"
import { RootState } from "./Store"
import { ThunkAction } from "@reduxjs/toolkit"
import { EventListColorNamesType, NavigationTitlesLanguageType, languagesAPI } from "../api/api"

const CHANGE_LANGUAGES_FETCHING_STATUS = "CHANGE_LANGUAGES_FETCHING_STATUS"
const SET_MONTHS_NAMES = "SET_MONTHS_NAMES"
const SET_WEEKDAYS_NAMES = "SET_WEEKDAYS_NAMES"
const SET_NAVIGATION_TITLES = "SET_NAVIGATION_TITLES"
const SET_EVENT_LIST_COLOR_NAMES = "SET_EVENT_LIST_COLOR_NAMES"

export type MonthType = {
    id: number,
    value: string
}
export type WeekDayType = {
    id: number,
    value: string
}

const initialState = {
    isFetching: false,
    currentLanguage: navigator.language || navigator.languages[0] as string,
    months: [
        {id: 1 ,value: ""},
        {id: 2 ,value: ""},
        {id: 3 ,value: ""},
        {id: 4 ,value: ""},
        {id: 5 ,value: ""},
        {id: 6 ,value: ""},
        {id: 7 ,value: ""},
        {id: 8 ,value: ""},
        {id: 9 ,value: ""},
        {id: 10 ,value: ""},
        {id: 11 ,value: ""},
        {id: 12 ,value: ""},
    ] as Array<MonthType>,
    weekDays: [
        {id: 1, value: ""}, //Monday
        {id: 2, value: ""},
        {id: 3, value: ""},
        {id: 4, value: ""},
        {id: 5, value: ""},
        {id: 6, value: ""},
        {id: 7, value: ""},
    ] as Array<WeekDayType>,
    navigationTitles: {
        viewSwitch: "",
        createEvent: "",
        createList: ""
    } as NavigationTitlesLanguageType,
    eventListColorNames: {
    } as EventListColorNamesType
}

type initialType = typeof initialState

type ChangeLanguagesFetchingStatusActionType = {
    type: typeof CHANGE_LANGUAGES_FETCHING_STATUS,
    newStatus: boolean
}
type SetMonthsNamesActionType = {
    type: typeof SET_MONTHS_NAMES,
    months: Array<string>
}
type SetWeekDaysNamesActionType = {
    type: typeof SET_WEEKDAYS_NAMES,
    weekDays: Array<string>
}
type SetNavigationTitlesActionType = {
    type: typeof SET_NAVIGATION_TITLES,
    navigationTitles: NavigationTitlesLanguageType
}
type SetEventListColorNamesActionType = {
    type: typeof SET_EVENT_LIST_COLOR_NAMES,
    eventListColorNames: EventListColorNamesType
}
type ActionsTypes = ChangeLanguagesFetchingStatusActionType | SetMonthsNamesActionType | SetWeekDaysNamesActionType | SetNavigationTitlesActionType | SetEventListColorNamesActionType
export const changeLanguagesFetchingStatusAC = (newStatus: boolean): ChangeLanguagesFetchingStatusActionType => {
    return {
        type: CHANGE_LANGUAGES_FETCHING_STATUS,
        newStatus: newStatus
    }
}
export const setMonthsNamesAC = (months: Array<string>): SetMonthsNamesActionType => {
    return {
        type: "SET_MONTHS_NAMES",
        months: months
    }
}
export const setWeekDaysNamesAC = (weekDays: Array<string>): SetWeekDaysNamesActionType => {
    return {
        type: "SET_WEEKDAYS_NAMES",
        weekDays: weekDays
    } 
}
export const setNavigationTitlesAC = (navigationTitles: NavigationTitlesLanguageType): SetNavigationTitlesActionType => {
    return {
        type: "SET_NAVIGATION_TITLES",
        navigationTitles: navigationTitles
    }
}
export const setEventListColorNamesAC = (eventListColorNames: EventListColorNamesType): SetEventListColorNamesActionType => {
    return {
        type: "SET_EVENT_LIST_COLOR_NAMES",
        eventListColorNames: eventListColorNames
    }
}

export const setNavigationTitlesTC = (lang: "en" | "fr" | "ru"): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async(dispatch: Dispatch) => {
    dispatch(changeLanguagesFetchingStatusAC(true))
    const response = await languagesAPI.getNavigationTitles(lang)
    if(response.resultCode === 0){
        dispatch(setNavigationTitlesAC(response.data.navigationTitles))
        dispatch(changeLanguagesFetchingStatusAC(false))
    }
}

export const setMonthsNamesTC = (lang: "en" | "fr" | "ru"): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async(dispatch: Dispatch) => {
    dispatch(changeLanguagesFetchingStatusAC(true))
    const response = await languagesAPI.getMonthsNames(lang)
    if(response.resultCode === 0){
        dispatch(setMonthsNamesAC(response.data.months))
        dispatch(changeLanguagesFetchingStatusAC(false))
    }
}
export const setWeekDaysNamesTC = (lang: "en" | "fr" | "ru"): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async(dispatch: Dispatch) => {
    dispatch(changeLanguagesFetchingStatusAC(true))
    const response = await languagesAPI.getWeekDaysNames(lang)
    if(response.resultCode === 0){
        dispatch(setWeekDaysNamesAC(response.data.weekDays))
        dispatch(changeLanguagesFetchingStatusAC(false))
    }
}

export const setEventListColorNamesTC = (lang: "en" | "fr" | "ru"): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async(dispatch) => {
    const response = await languagesAPI.getEventListColorNames(lang)
    if(response.resultCode === 0)
        dispatch(setEventListColorNamesAC(response.data.eventListColorNames))
}

export const LanguageDataReducer = (state: initialType = initialState, action: ActionsTypes): initialType => {
    switch(action.type){
        case "CHANGE_LANGUAGES_FETCHING_STATUS":
            var stateCopy = {...state} 
            stateCopy.isFetching = action.newStatus
            return stateCopy
        case "SET_MONTHS_NAMES":
            var stateCopy: initialType = {...state}
            stateCopy.months = [...state.months]
            stateCopy.months = action.months.map((e) => {
                return {id: action.months.indexOf(e) + 1, value: e}
            })
            return stateCopy
        case "SET_WEEKDAYS_NAMES": 
            var stateCopy = {...state}
            stateCopy.weekDays = action.weekDays.map((e) => {
                return {id: action.weekDays.indexOf(e) + 1, value: e}
            })
            return stateCopy
        case "SET_NAVIGATION_TITLES":
            var stateCopy = {...state}
            stateCopy.navigationTitles = action.navigationTitles
            return stateCopy
        case "SET_EVENT_LIST_COLOR_NAMES":
            var stateCopy = {...state}
            stateCopy.eventListColorNames = action.eventListColorNames
            return stateCopy
        default:
            return state
    }
}