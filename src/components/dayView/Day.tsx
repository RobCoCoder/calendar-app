import styled from "styled-components"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { selectDayOfTheMonth, selectMonth, selectMonthName, selectYear } from "../../Redux/selectors/DatesSelectors"
import { selectCurrentLanguage, selectEventListColorNames, selectLanguagesIsFetching, selectWeekDays } from "../../Redux/selectors/LanguageSelectors"
import { WeekDayType } from "../../Redux/LanguageDataReducer"
import { ReactElement, useEffect, useState } from "react"
import { DayTitleSkeleton } from "./DayTitleSkeleton"
import { SwitchDateButton } from "../buttons/switchButton/SwitchDateButton"
import { HourBar } from "./HourBar/HourBar"
import { EventType, fetchEventsOfDayTC } from "../../Redux/EventsReducer"
import { selectEventLists, selectEvents, selectEventsIsFetching } from "../../Redux/selectors/EventsSelectors"
import { EventCell } from "./EventCell/EventCell"
import { Search } from "../search/Search"
import { selectViewType } from "../../Redux/selectors/GlobalSelectors"

type PropsType = {
    isSplitScreen: boolean
}

export const Day = (props: PropsType) => {
    const dispatch = useAppDispatch()

    //state
    const viewType = useAppSelector((state: RootState) => selectViewType(state))
    const currentLanguage: string = useAppSelector((state: RootState) => selectCurrentLanguage(state))
    const year: number = useAppSelector((state: RootState) => selectYear(state))
    const month: number = useAppSelector((state) => selectMonth(state)) 
    const monthName: string | null = useAppSelector((state: RootState) => selectMonthName(state))
    const weekDays: Array<WeekDayType> = useAppSelector((state: RootState) => selectWeekDays(state))
    const dayOfTheMonth: number = useAppSelector((state: RootState) => selectDayOfTheMonth(state))
    const events: EventType[] = useAppSelector((state: RootState) => selectEvents(state))
    const eventLists = useAppSelector((state: RootState) => selectEventLists(state))
    const eventsIsFetching: boolean = useAppSelector((state: RootState) => selectEventsIsFetching(state))
    const languagesIsFetching: boolean = useAppSelector((state: RootState) => selectLanguagesIsFetching(state))

    //local state
    const [dayOfTheWeek, setDayOfTheWeek] = useState<number>(new Date(year, month-1, dayOfTheMonth).getDay()) //Sunday=0, Saturday=6
    if(dayOfTheWeek === 0) {
        setDayOfTheWeek(7) //Sunday is 7th, Monday is 1st
    }

    useEffect(() => {
        dispatch(fetchEventsOfDayTC(year, month, dayOfTheMonth))
        setDayOfTheWeek(new Date(year, month-1, dayOfTheMonth).getDay())
        if(dayOfTheWeek === 0) {
            setDayOfTheWeek(7) //Sunday is 7th, Monday is 1st
        }
    }, [dayOfTheMonth])

    const HourBars = []
    for(let i = 0; i < 24; i++) {
        HourBars.push(<HourBar hour={i}></HourBar>)
    }

    const eventCells: Array<ReactElement> = []
    events.forEach((e: EventType) => {
        // eventCells.push(<EventCell eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={e.start.hour * 60 + e.start.minute} barsAmount={(e.end.hour - e.start.hour)*60 + (60 - e.start.minute) + e.end.minute}></EventCell>)

        let accentColor = "white"
        for(let i = 0; i < eventLists.length; i++){
            if(eventLists[i].eventList === e.eventList){
                accentColor = eventLists[i].accentColor
                break;
            }
        }
        //1.
        if(e.start.year < year && year < e.end.year)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={1440} accentColor={accentColor}></EventCell>)
        //2. 
        else if(e.start.year === year && year < e.end.year && e.start.month < month){
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={1440} accentColor={accentColor}></EventCell>)
        }
        //3. 
        else if(e.start.year === year && year < e.end.year && e.start.month === month && e.start.day < dayOfTheMonth){
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={1440} accentColor={accentColor}></EventCell>)
        }
        //4.
        else if(e.start.year === year && year < e.end.year && e.start.month === month && e.start.day === dayOfTheMonth)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={e.start.hour * 60 + e.start.minute} barsAmount={1440 - (e.start.hour * 60 + e.start.minute)} accentColor={accentColor}></EventCell>)
        //5. 
        else if(e.start.year < year && year === e.end.year && month < e.end.month)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={1440} accentColor={accentColor}></EventCell>)
        //6.
        else if(e.start.year < year && year === e.end.year && month === e.end.month && dayOfTheMonth < e.end.day)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={1440} accentColor={accentColor}></EventCell>)
        //7.
        else if(e.start.year < year && year === e.end.year && month === e.end.month && dayOfTheMonth === e.start.day)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={e.end.hour * 60 + e.end.minute} accentColor={accentColor}></EventCell>)
        //8.
        else if(e.start.year === year && year === e.end.year && e.start.month < month && month < e.end.month)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={1440} accentColor={accentColor}></EventCell>)
        //9.
        else if(e.start.year === year && year === e.end.year && e.start.month === month && month < e.end.month && e.start.day < dayOfTheMonth)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={1440} accentColor={accentColor}></EventCell>)
        //10.
        else if(e.start.year === year && year === e.end.year && e.start.month === month && month < e.end.month && e.start.day === dayOfTheMonth)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={e.start.hour * 60 + e.start.minute} barsAmount={1440 - (e.start.hour * 60 + e.start.minute)} accentColor={accentColor}></EventCell>)
        //11.
        else if(e.start.year === year && year === e.end.year && e.start.month < month && month === e.end.month && dayOfTheMonth < e.end.day)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={1440} accentColor={accentColor}></EventCell>)
        //12.
        else if(e.start.year === year && year === e.end.year && e.start.month < month && month === e.end.month && dayOfTheMonth === e.end.day)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={e.end.hour * 60 + e.end.minute} accentColor={accentColor}></EventCell>)
        //13.
        else if(e.start.year === year && year === e.end.year && e.start.month === month && month === e.end.month && e.start.day < dayOfTheMonth && dayOfTheMonth < e.end.day)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={1440} accentColor={accentColor}></EventCell>)
        //14.
        else if(e.start.year === year && year === e.end.year && e.start.month === month && month === e.end.month && e.start.day === dayOfTheMonth && dayOfTheMonth < e.end.day)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={e.start.hour * 60 + e.start.minute} barsAmount={1440 - (e.start.hour * 60 + e.start.minute)} accentColor={accentColor}></EventCell>)
        //15.
        else if(e.start.year === year && year === e.end.year && e.start.month === month && month === e.end.month && e.start.day < dayOfTheMonth && dayOfTheMonth === e.end.day)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={0} barsAmount={e.end.hour * 60 + e.end.minute} accentColor={accentColor}></EventCell>)
        //16.
        else if(e.start.year === year && year === e.end.year && e.start.month === month && month === e.end.month && e.start.day === dayOfTheMonth && dayOfTheMonth === e.end.day)
            eventCells.push(<EventCell _id={e._id} eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={e.start.hour * 60 + e.start.minute} barsAmount={(60 - e.start.minute) + ((e.end.hour - (e.start.hour+1)) * 60) + e.end.minute} accentColor={accentColor}></EventCell>)
            // eventCells.push(<EventCell eventName={e.eventName} eventList={e.eventList} start={e.start} end={e.end} startBars={e.start.hour * 60 + e.start.minute} barsAmount={(e.start.hour*60 + e.start.minute) - (e.end.hour*60 + e.end.minute)}></EventCell>)
    })

    return (
        <DayContainer viewType={viewType} isSplitScreen={props.isSplitScreen}>
            <DayTitleBar>
                <SwitchDateButton direction="back" switchType={viewType} />
                <Search currentLanguage={currentLanguage} monthName={monthName} year={year} dayOfTheMonth={dayOfTheMonth} isSplitScreen={props.isSplitScreen}/>
                <SwitchDateButton direction="forward" switchType={viewType} />

                {/* <SwitchDateButton direction="back" switchType="day"/>
                {!eventsIsFetching && !languagesIsFetching && dayOfTheWeek !== 0 ? <DayTitle>{`${weekDays[dayOfTheWeek-1].value}, ${monthName} ${dayOfTheMonth}, ${year}`}</DayTitle> : <DayTitleSkeleton/>}
                <SwitchDateButton direction="forward" switchType="day"/> */}
            </DayTitleBar>
            <Contents>
                <HoursContainer>
                    {HourBars}
                </HoursContainer>
                <EventCellsContainer>
                    {eventCells}
                </EventCellsContainer>
            </Contents>
        </DayContainer>   
    )
}

const DayContainer = styled.div<{viewType: string, isSplitScreen: boolean}>`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    position: relative; 
    width: calc(100% - 10px);
    height: calc(100% - 10px);

    overflow-y: scroll;
    background-color: black;
    padding: 5px;
`
const DayTitleBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    width: calc(100% - 20px);
    height: calc(10% - 20px);
    min-height: 30px;

    z-index: 100;
    background-color: white;
    padding: 10px;
    margin-bottom: 10px;
    font-size: var(--titleFont);
    font-weight: 500;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

// const DayTitle = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     overflow-x: scroll;
//     width: 80%;
//     height: 100%;
//     aspect-ratio: 1/0.2;
// `

const Contents = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    width: 100%;
    height: 100%;

    @media (max-height: 600px) {
        height: fit-content;
    }
`

const HoursContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 10%;
    max-width: 60px;
    height: 100%;
`

const EventCellsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    overflow-y: none;
`