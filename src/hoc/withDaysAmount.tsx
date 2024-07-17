import React, { ComponentType, ReactElement, useEffect, useState } from "react";
import { RootState, useAppSelector } from "../Redux/Store";
import { selectMonth, selectYear } from "../Redux/selectors/DatesSelectors";

export function withDaysAmount<WCP extends {}>(WrappedComponent: ComponentType<WCP>){
    const Wrapper = (props: WCP) => {
        const year = useAppSelector((state: RootState) => selectYear(state))
        const month = useAppSelector((state: RootState) => selectMonth(state))

        //creating a new Date requires to enter the real month number (January = 1) but Date.getMonth() returns months from 0
        const [daysAmount, setDaysAmount] = useState<number>(new Date(year, month, 0).getDate())

        useEffect(() => {
            setDaysAmount(new Date(year, month, 0).getDate())
        }, [year, month])

        return (
            <div>
                <WrappedComponent {...props} daysAmount = {daysAmount}/>
            </div>
        )
    }
    return Wrapper
}
