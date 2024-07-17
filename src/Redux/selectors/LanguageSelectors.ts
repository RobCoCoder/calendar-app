import { createSelector } from "reselect";
import { MonthType, WeekDayType } from "../LanguageDataReducer";
import { RootState } from "../Store";

export const selectLanguagesIsFetching = (state: RootState) => {
    return state.languageData.isFetching
}

export const selectCurrentLanguage = (state: RootState): string => {
    return state.languageData.currentLanguage
}

export const selectMonths = (state: RootState): Array<MonthType> => {
    return state.languageData.months
}

export const selectWeekDays = (state: RootState): Array<WeekDayType> => {
    return state.languageData.weekDays
}

export const selectNavigationTitles = (state: RootState) => {
    return state.languageData.navigationTitles
}

export const selectEventListColorNames = (state: RootState) => {
    return state.languageData.eventListColorNames
}