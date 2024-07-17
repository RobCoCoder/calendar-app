import { createSelector } from "reselect"
import { RootState } from "../Store"
import { selectMonths } from "./LanguageSelectors"

export const selectYear = (state: RootState): number => {
    return state.dates.year
}

export const selectMonth = (state: RootState): number => {
    return state.dates.month
}
export const selectMonthName = createSelector(selectMonth, selectMonths, (month, months): string | null => {
    for(let i = 0; i < 12; i++){
        if(months[i].id === month){
            return months[i].value
        }
    }
    return null
})

export const selectDayOfTheMonth = (state: RootState): number => {
    return state.dates.dayOfTheMonth
}