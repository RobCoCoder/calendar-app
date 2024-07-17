import styled from "styled-components"
import { useAppDispatch } from "../../../Redux/Store"
import { changeEventUpserterOpenedStatusAC, changeEventsViewerOpenedStatusAC } from "../../../Redux/GlobalDataReducer"
import { setSelectedEventAC } from "../../../Redux/EventsReducer"

type StartEnd = {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number
}

type PropsType = {
    _id: string
    eventName: string,
    eventList: string,
    start: StartEnd
    end: StartEnd

    startBars: number
    barsAmount: number
    accentColor: string
}

export const EventCell = (props: PropsType) => {
    const dispatch = useAppDispatch()

    const openEventUpserter = () => {
        dispatch(changeEventsViewerOpenedStatusAC(false))
        dispatch(setSelectedEventAC({
            _id: props._id,
            eventList: props.eventList,
            eventName: props.eventName,
            start: {...props.start},
            end: {...props.end},
            description: "",
            URLs: null
        }))
        dispatch(changeEventUpserterOpenedStatusAC(true))
    }

    return (
        <EventCellContainer backgroundColor={props.accentColor} startBars={props.startBars} barsAmount={props.barsAmount} eventList={props.eventList} onClick={openEventUpserter}>
            {props.eventName}
        </EventCellContainer>
    )
}

const EventCellContainer = styled.div<{backgroundColor: string, startBars: number, barsAmount: number, eventList: string}>`
    display: inline-block;
    position: relative;
    width: fit-content;
    max-width: 180px;
    height: ${props => `calc(${props.barsAmount} * 100% / 1440)`};
    top: ${props => `calc(${props.startBars} * 100% / 1440)`};
    margin-left: 10px;
    margin-right: 10px;

    background-color: ${props => props.backgroundColor};
    border-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    &:hover{
        cursor: pointer;
    }
`