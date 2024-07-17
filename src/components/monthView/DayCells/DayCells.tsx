import React, { ReactElement, useEffect, useState } from "react"
import { fetchEventsOfMonthTC } from "../../../Redux/EventsReducer"
import { RootState, useAppDispatch, useAppSelector } from "../../../Redux/Store"
import { Dispatch } from "redux"
import { selectDayOfTheMonth, selectMonth, selectYear } from "../../../Redux/selectors/DatesSelectors"
import { DayCell } from "./DayCell/DayCell"
import { selectEventDaysForMonth, selectEventsIsFetching } from "../../../Redux/selectors/EventsSelectors"
import styled from "styled-components"
import { DayCellsSkeleton } from "./DayCellsSkeleton"

type PropsType = {
    daysAmount: number
    firstWeekDayOfMonth: number
    lastWeekDayOfMonth: number
}

export const DayCells = React.memo((props: PropsType) => {
    const dispatch: Dispatch<any> = useAppDispatch() 

    //local state
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)

    //state
    const year: number = useAppSelector((state: RootState) => selectYear(state))
    const month: number = useAppSelector((state: RootState) => selectMonth(state))
    const dayOfTheMonth: number = useAppSelector((state: RootState) => selectDayOfTheMonth(state))
    const eventDays: Array<{day: number, eventName: string}> = useAppSelector((state) => selectEventDaysForMonth(state))
    const eventsIsFetching: boolean = useAppSelector((state) => selectEventsIsFetching(state))

    //dispatch
    const fetchEvents = () => {dispatch(fetchEventsOfMonthTC(year, month))}

    useEffect(() => {
        fetchEvents()
    }, [year, month])

    let dayCells: Array<ReactElement> = []
    //first empty day cells
    if(props.firstWeekDayOfMonth === 0){
        for(let i = 0; i < 6; i++)
            dayCells.push(<DayCell dayNumber={null} isEmpty={true} isCurrentDay={false} hasEvents={false} eventNames={null}/>)
    }
    else {
        for(let i = 0; i < props.firstWeekDayOfMonth-1; i++){
            dayCells.push(<DayCell isCurrentDay={false} dayNumber={null} isEmpty={true} hasEvents={false} eventNames={null}/>)
        }
    }
    //normal day cells
    for(let i = 0; i < props.daysAmount; i++){
        let eventNames: Array<string> = []
        eventDays.forEach((event) => {
            if(event.day === i + 1)
                eventNames.push(event.eventName)
        })
        
        if(eventNames.length !== 0)
            dayCells.push(<DayCell isCurrentDay={(i+1 === dayOfTheMonth && currentMonth === month)} dayNumber={i+1} isEmpty={false} hasEvents={true} eventNames={eventNames}/>)
        else 
            dayCells.push(<DayCell isCurrentDay={(i+1 === dayOfTheMonth && currentMonth === month && currentYear === year)} dayNumber={i+1} isEmpty={false} hasEvents={false} eventNames={null}/>)
    }
    //last empty day cells
    if(props.lastWeekDayOfMonth !== 0){
        for(let i = 0; i < (7-props.lastWeekDayOfMonth); i++){
            dayCells.push(<DayCell isCurrentDay={false} dayNumber={null} isEmpty={true} hasEvents={false} eventNames={null}/>)
        }
    }

    return (
        <DayCellsContainer>
            {dayCells}
        </DayCellsContainer>
    )
})

const DayCellsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:space-around;
    align-items: center;
    position: relative;
    width: 100%;

    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    @media (min-height: 990px){
        height: 90%;
    }
`