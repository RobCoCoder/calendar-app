import { ThunkAction } from "redux-thunk"
import { RootState } from "./Store"
import { Dispatch, UnknownAction } from "redux"
import { PostPutEventResponseType, eventsAPI } from "../api/api"
import { changeEventUpserterOpenedStatusAC } from "./GlobalDataReducer"
import { addNewNotifications } from "./NotificationsReducer"
import { ValidationError } from "../base"

type ErrorType = {
    response: {
        data: {
            messages: Array<ValidationError>
        }
    }
}

const CHANGE_EVENTS_FETCHING_STATUS = "CHANGE_EVENTS_FETCHING_STATUS"
const SET_EVENT_LISTS = "SET_EVENT_LISTS"
const SET_EVENTS = "SET_EVENTS"
const CREATE_EVENT = "CREATE_EVENT"
const UPDATE_EVENT = "UPDATE_EVENT"
const DELETE_EVENT = "DELETE_EVENT"
const CREATE_EVENT_LIST = "CREATE_EVENT_LIST"
const SET_SELECTED_EVENT = "SET_SELECTED_EVENT"

export type EventType = {
    _id: string,
    eventName: string,
    eventList: string,
    start: {
        year: number,
        month: number, //1-12
        day: number,
        hour: number, //0-24
        minute: number
    },
    end: {
        year: number,
        month: number, //1-12
        day: number,
        hour: number, //0-24
        minute: number
    },
    description: string,
    URLs: Array<string> | null
}

export type EventListType = {
    eventList: string,
    accentColor: string
}

const initialState = {
    isFetching: false as boolean,
    isCreating: false as boolean,
    eventLists: [] as Array<EventListType>,
    events: {} as Array<EventType>,
    selectedEvent: null as EventType | null //the selected event (if null => creating event. Otherwise editing an existing event)
}
type initialType = typeof initialState

type ChangeEventsFetchingStatusActionType = {
    type: typeof CHANGE_EVENTS_FETCHING_STATUS,
    newStatus: boolean
}
export const changeEventsFetchingStatusAC = (newStatus: boolean): ChangeEventsFetchingStatusActionType => {
    return {
        type: CHANGE_EVENTS_FETCHING_STATUS,
        newStatus: newStatus
    }
}

type SetEventListsActionType = {
    type: typeof SET_EVENT_LISTS
    eventLists: EventListType[]
}

export const setEventListsAC = (eventLists: EventListType[]): SetEventListsActionType => {
    return {
        type: "SET_EVENT_LISTS",
        eventLists: eventLists
    }
}

type SetEventsActionType = {
    type: typeof SET_EVENTS,
    events: Array<EventType>
}
export const setEventsAC = (events: Array<EventType>): SetEventsActionType => {
    return {
        type: SET_EVENTS,
        events: events
    }
}

type CreateEventActionType = {
    type: typeof CREATE_EVENT,
    event: EventType
}
export const createEventAC = (event: EventType): CreateEventActionType => {
    return {
        type: "CREATE_EVENT",
        event: event
    }
}

type UpdateEventActionType = {
    type: typeof UPDATE_EVENT,
    _id: string
    event: EventType
}
export const updateEventAC = (_id: string, event: EventType): UpdateEventActionType => {
    return {
        type: "UPDATE_EVENT",
        _id: _id,
        event: event
    }
}

type DeleteEventActionType = {
    type: typeof DELETE_EVENT
    _id: string
}
export const deleteEventAC = (_id: string): DeleteEventActionType => {
    return {
        type: "DELETE_EVENT",
        _id: _id
    }
}

type CreateEventListActionType = {
    type: typeof CREATE_EVENT_LIST,
    eventList: EventListType
}
export const createEventListAC = (eventList: EventListType): CreateEventListActionType => {
    return {
        type: "CREATE_EVENT_LIST",
        eventList: eventList
    }
}

type SetSelectedEventActionType = {
    type: typeof SET_SELECTED_EVENT
    event: EventType | null
}
export const setSelectedEventAC = (event: EventType | null): SetSelectedEventActionType => {
    return {
        type: "SET_SELECTED_EVENT",
        event: event
    }
}

type ActionsTypes = ChangeEventsFetchingStatusActionType | SetEventListsActionType | SetEventsActionType | CreateEventActionType | CreateEventListActionType | SetSelectedEventActionType | UpdateEventActionType | DeleteEventActionType

export const fetchEventListsTC = (): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async(dispatch) => {
    dispatch(changeEventsFetchingStatusAC(true))
    const response = await eventsAPI.getEventLists()
    if(response.resultCode === 0)
        dispatch(setEventListsAC(response.data.eventLists))
    dispatch(changeEventsFetchingStatusAC(false))
}

export const fetchEventsOfMonthTC = (year: number, month: number): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async (dispatch) => {
    dispatch(changeEventsFetchingStatusAC(true))
    const response = await eventsAPI.getEventsOfMonth(year, month)
    if(response.resultCode === 0){
        dispatch(setEventsAC(response.data.events))
    }
    dispatch(changeEventsFetchingStatusAC(false))
}

export const fetchEventsOfDayTC = (year: number, month: number, day: number): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async (dispatch) => {
    dispatch(changeEventsFetchingStatusAC(true))
    const response = await eventsAPI.getEventsOfDay(year, month, day)
    if(response.resultCode === 0){
        dispatch(setEventsAC(response.data.events))
        console.log(response.data.events)
    }
    dispatch(changeEventsFetchingStatusAC(false))
}

export const fetchEventsTC = (): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async(dispatch) => {
    dispatch(changeEventsFetchingStatusAC(true))
    const response = await eventsAPI.getEvents()
    if(response.resultCode === 0){
        dispatch(setEventsAC(response.data.events))
    }
    dispatch(changeEventsFetchingStatusAC(false))
}

export const deleteEventTC = (_id: string): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async(dispatch) => {
    const response = await eventsAPI.deleteEvent(_id)
    if(response.resultCode === 0)
        dispatch(deleteEventAC(_id))
}

export const createEventTC = (eventList: string, eventName: string, start: {year: number, month: number, day: number, hour: number, minute: number}, end: {year: number, month: number, day: number, hour: number, minute: number}): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async(dispatch: Dispatch<any>) => {
    /**
     * month -> 1-12
     */
    console.log(eventList)
    console.log(eventName)
    console.log(start.year)
    console.log(start.month)
    console.log(start.day)
    console.log(start.hour)
    console.log(start.minute)
    console.log(end.year)
    console.log(end.month)
    console.log(end.day)
    console.log(end.hour)
    console.log(end.minute)
    try{
        const response = await eventsAPI.createEvent(eventList, eventName, start, end)
        if(response.resultCode === 0){
            dispatch(changeEventUpserterOpenedStatusAC(false))
            dispatch(createEventAC(response.data.event))
        }
    } catch(err: any){
        let totalMessage: string = ""
        err.response.data.messages.forEach((message: ValidationError) => {
            totalMessage += message.msg + "\n"
        })
        dispatch(addNewNotifications([
            {type: "Error", eventList: null, name: "form error", description: totalMessage, URLs: null}
        ]))
    }
}

export const updateEventTC = (_id: string, eventList: string, eventName: string, start: {year: number, month: number, day: number, hour: number, minute: number}, end: {year: number, month: number, day: number, hour: number, minute: number}): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async(dispatch: Dispatch<any>) => {
    try{
        const response = await eventsAPI.updateEvent(_id, eventList, eventName, start, end)
        if(response.resultCode === 0){
            dispatch(changeEventUpserterOpenedStatusAC(false))
            dispatch(updateEventAC(_id, response.data.event))
        }
    } catch(err: any){
        let totalMessage: string = ""
        err.response.data.messages.forEach((message: ValidationError) => {
            totalMessage += message.msg + "\n"
        })
        dispatch(addNewNotifications([
            {type: "Error", eventList: null, name: "form error", description: totalMessage, URLs: null}
        ]))
    }
}

export const createEventListTC = (eventList: string, accentColor: string): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async(dispatch) => {
    const response = await eventsAPI.createEventList(eventList, accentColor)
    if(response.resultCode === 0){
        dispatch(createEventListAC(response.data.eventList))
    }
} 

export const EventsReducer = (state: initialType = initialState, action: ActionsTypes) => {
    switch(action.type){
        case "CHANGE_EVENTS_FETCHING_STATUS":
            var stateCopy = {...state}
            stateCopy.isFetching = action.newStatus
            return stateCopy
        case "SET_EVENT_LISTS":
            var stateCopy = {...state}
            stateCopy.eventLists = action.eventLists
            return stateCopy
        case "SET_EVENTS":
            var stateCopy = {...state}
            stateCopy.events = [...action.events]
            return stateCopy
        case "CREATE_EVENT": 
            var stateCopy = {...state}
            stateCopy.events = [...state.events]
            stateCopy.events.push(action.event)
            return stateCopy
        case "UPDATE_EVENT":
            var stateCopy = {...state}
            stateCopy.events = [...state.events]
            var eventIndex = state.events.findIndex((event) => {
                return event._id === action._id
            })
            stateCopy.events[eventIndex] = {...state.events[eventIndex]}
            stateCopy.events[eventIndex] = action.event
            return stateCopy
        case "DELETE_EVENT":
            var stateCopy = {...state}
            var eventIndex = state.events.findIndex((event) => {
                return event._id === action._id
            })
            stateCopy.eventLists = [...state.eventLists]
            if(eventIndex > -1) stateCopy.eventLists.slice(eventIndex, 1)
            return stateCopy
        case "CREATE_EVENT_LIST":
            var stateCopy = {...state}
            stateCopy.eventLists = [...state.eventLists]
            stateCopy.eventLists.push(action.eventList)
            return stateCopy
        case "SET_SELECTED_EVENT":
            var stateCopy = {...state}
            if(state.selectedEvent) stateCopy.selectedEvent = {...state.selectedEvent}
            stateCopy.selectedEvent = action.event
            return stateCopy
        default:
            return state
    }
}

