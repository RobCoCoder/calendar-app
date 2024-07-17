import React, { ReactElement, Suspense, useEffect, useState } from "react"
import { WeekDayType, setMonthsNamesTC, setWeekDaysNamesTC } from "../../Redux/LanguageDataReducer"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { Dispatch } from "redux"
import styled from "styled-components"
import { selectDayOfTheMonth, selectMonth, selectMonthName, selectYear } from "../../Redux/selectors/DatesSelectors"
import { selectCurrentLanguage, selectMonths, selectWeekDays } from "../../Redux/selectors/LanguageSelectors"
import { WeekDayCell } from "./WeekDayCell"
import { Search } from "../search/Search"
import { EventType } from "../../Redux/EventsReducer"
import { selectEventDaysForMonth, selectEvents, selectEventsIsFetching } from "../../Redux/selectors/EventsSelectors"
import { DayCellsSkeleton } from "./DayCells/DayCellsSkeleton"
import { selectViewType } from "../../Redux/selectors/GlobalSelectors"
import { SwitchDateButton } from "../buttons/switchButton/SwitchDateButton"

const DayCellsContainer = React.lazy(() => import("./DayCells/DayCellsContainer"))

type PropsType = {
    width: number
} 

export const Month = (props: PropsType) => { 
    //const dispatch: Dispatch<any> = useAppDispatch() 

    //state
    const viewType = useAppSelector((state: RootState) => selectViewType(state))
    const currentLanguage: string = useAppSelector((state: RootState) => selectCurrentLanguage(state))
    const year: number = useAppSelector((state: RootState) => selectYear(state))
    const monthName: string | null = useAppSelector((state: RootState) => selectMonthName(state))
    const weekDays: Array<WeekDayType> = useAppSelector((state: RootState) => selectWeekDays(state))

    const weekDaysCells: Array<ReactElement> = weekDays.map((e) => {
        return <WeekDayCell width={props.width} weekDayName={e.value}/>
    }) 

    return(
        <MonthContainer>
            <MontTitleBar>
                <SwitchDateButton direction="back" switchType={viewType} />
                <Search monthName={monthName} year={year} currentLanguage={currentLanguage}/>
                <SwitchDateButton direction="forward" switchType={viewType} />
            </MontTitleBar>
            <MonthView>
                <WeekDaysBar>
                    {weekDaysCells}
                </WeekDaysBar>
                <DayCellsContainer/>
            </MonthView>
        </MonthContainer>
    )
}

const MonthContainer = styled.div`
    display: block;
    position: relative; 
    margin-top: 40px;
    width: 100%;
    height: calc(100% - 40px);
`

const MontTitleBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 90%;
    height: 50px;
    margin: 0 auto;
    background-color: tranresparent;
    font-size: var(--titleFont);

    @media (min-width: 990px){
        width: 80%;
    }
`

const MonthView = styled.div`
    display: block;
    position: relative;
    width: 90%;
    height: fit-content;
    margin: 20px auto 0px;

    border-radius: 10px;
    background-color: var(--secondaryColour);
    font-size: var(--defaultFont);

    @media (min-width: 990px){
        width: 80%;
    }
`

const WeekDaysBar = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:space-around;
    align-items: center;
    position: relative;
    width: 100%;
    height: 10%;

    background-color: var(--mainColour);
    color: white;
    font-size: var(--defaultFont);
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`