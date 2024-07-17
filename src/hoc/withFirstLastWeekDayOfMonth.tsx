import { ComponentType, useEffect, useState } from "react";
import { RootState, useAppSelector } from "../Redux/Store";
import { selectMonth, selectYear } from "../Redux/selectors/DatesSelectors";

export function withFirstLastWeekDayOfMonth<WCP extends {}>(WrappedComponent: ComponentType<WCP>){
    const Wrapper = (props: WCP) => {
        const year = useAppSelector((state: RootState) => selectYear(state))
        const month = useAppSelector((state: RootState) => selectMonth(state))

        const [daysAmount, setDaysAmount] = useState<number>(new Date(year, month, 0).getDate())
        const [firstWeekDayOfMonth, setFirstWeekDayOfMonth] = useState<number>(new Date(year + "-" + month + "-01").getDay()) //Sunday=0
        const [lastWeekDayOfMonth, setLastWeekDayOfMonth] = useState<number>(new Date(year + "-" + month + "-" + daysAmount).getDay()) //Sunday=0

        useEffect(() => {
            setDaysAmount(new Date(year, month, 0).getDate())
            setFirstWeekDayOfMonth(new Date(year, month-1, 1).getDay()) 
            setLastWeekDayOfMonth(new Date(year, month-1, new Date(year, month, 0).getDate()).getDay())
        }, [year, month])

        return (
            <WrappedComponent {...props} firstWeekDayOfMonth={firstWeekDayOfMonth} lastWeekDayOfMonth={lastWeekDayOfMonth}/>
        )
    }

    return Wrapper
}