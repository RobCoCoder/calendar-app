import { ActionCreator } from "redux"

const SWITCH_MONTH =  "SWITCH_MONTH"
const SWITCH_DAY = "SWITCH_DAY"
const CHANGE_YEAR_MONTH =  "CHANGE_YEAR_MONTH"
const CHANGE_YEAR_MONTH_DAY =  "CHANGE_YEAR_MONTH_DAY"
const SELECT_DAY =  "SELECT_DAY"

const date = new Date()
const initialState = {
    year: date.getFullYear(),
    month: date.getMonth() + 1, //January = 1, December = 12
    dayOfTheMonth: date.getDate(),
}

type initialType = typeof initialState

type SwitchMonthActionType = {
    type: typeof SWITCH_MONTH
    direction: "back" | "forward"
}
export const switchMonthAC = (direction: "back" | "forward"): SwitchMonthActionType => {
    return {
        type: SWITCH_MONTH,
        direction: direction
    }
}

type SwitchDayActionType = {
    type: typeof SWITCH_DAY
    direction: "back" | "forward"
}
export const switchDayAC = (direction: "back" | "forward"): SwitchDayActionType => {
    return {
        type: SWITCH_DAY,
        direction: direction
    }
}

type ChangeYearMonthActionType = {
    type: typeof CHANGE_YEAR_MONTH,
    year: number,
    month: number //1-12
}

export const changeYearMonthAC = (year: number, month: number): ChangeYearMonthActionType => {
    return {
        type: CHANGE_YEAR_MONTH,
        year: year,
        month: month
    }
}

type ChangeYearMonthDayActionType = {
    type: typeof CHANGE_YEAR_MONTH_DAY,
    year: number,
    month: number,
    dayOfTheMonth: number
}

export const changeYearMonthDayAC = (year: number, month: number, dayOfTheMonth: number): ChangeYearMonthDayActionType => {
    return {
        type: "CHANGE_YEAR_MONTH_DAY",
        year: year,
        month: month,
        dayOfTheMonth: dayOfTheMonth
    }
}

type SelectDayActionType = {
    type: typeof SELECT_DAY,
    day: number
}

export const selectDayAC = (day: number): SelectDayActionType => {
    return {
        type: SELECT_DAY,
        day: day
    }
}

type ActionsTypes = SwitchMonthActionType | SwitchDayActionType | ChangeYearMonthActionType | ChangeYearMonthDayActionType | SelectDayActionType
export const DatesReducer = (state: initialType = initialState, action: ActionsTypes): initialType => {
    switch(action.type){
        case "SWITCH_MONTH":
            var stateCopy = {...state}
            if(action.direction === "back"){
                if(state.month === 1){
                    stateCopy.month = 12
                    stateCopy.year = state.year-1 
                }
                else stateCopy.month = state.month-1
            }
            if(action.direction === "forward"){
                if(state.month === 12){
                    stateCopy.month = 1
                    stateCopy.year = state.year+1
                }
                else stateCopy.month = state.month+1
            }
            return stateCopy
        case "SWITCH_DAY":
            var stateCopy = {...state}
            if(action.direction === "back"){
                if(stateCopy.dayOfTheMonth === 1){
                    if(stateCopy.month === 1){
                        stateCopy.month = 12
                        stateCopy.year -= 1;
                        stateCopy.dayOfTheMonth = new Date(stateCopy.year, stateCopy.month, 0).getDate()
                    }
                    else {
                        stateCopy.month -= 1;
                        stateCopy.dayOfTheMonth = new Date(stateCopy.year, stateCopy.month, 0).getDate()
                    }
                }
                else stateCopy.dayOfTheMonth -= 1
            }
            if(action.direction === "forward"){
                if(stateCopy.dayOfTheMonth === new Date(state.year, state.month, 0).getDate()){ //if current day is the last day of month
                    if(stateCopy.month === 12){
                        stateCopy.month = 1
                        stateCopy.year += 1
                        stateCopy.dayOfTheMonth = 1
                    }
                    else {
                        stateCopy.month += 1
                        stateCopy.dayOfTheMonth = 1
                    }
                }
                else stateCopy.dayOfTheMonth +=1
            }
            return stateCopy
        case "CHANGE_YEAR_MONTH":
            var stateCopy = {...state}
            stateCopy.year = action.year
            stateCopy.month = action.month
            return stateCopy
        case "CHANGE_YEAR_MONTH_DAY":
            var stateCopy = {...state}
            stateCopy.year = action.year
            stateCopy.month = action.month
            stateCopy.dayOfTheMonth = action.dayOfTheMonth
            return stateCopy
        case "SELECT_DAY":
            var stateCopy = {...state}
            stateCopy.dayOfTheMonth = action.day
            return stateCopy
        default:
            return state
    }
}

