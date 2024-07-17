import { createSelector } from "reselect";
import { EventType } from "../EventsReducer";
import { RootState } from "../Store";
import { selectMonth, selectMonthName, selectYear } from "./DatesSelectors";

export const selectEventsIsFetching = (state: RootState): boolean => {
    return state.events.isFetching
}

export const selectEventLists = (state: RootState) => {
    return state.events.eventLists
}

export const selectEventListsNames = createSelector(selectEventLists, (eventListsObjectArray): string[] => {
    return eventListsObjectArray.map((object) => {
        return object.eventList
    })  
})

export const selectEvents = (state: RootState): Array<EventType> => {
    return state.events.events
}

export const selectEventDaysForMonth = createSelector(selectEvents, selectYear, selectMonth, (events, year, month): Array<{day: number, eventName: string}> => {
    const eventDays: Array<{day: number, eventName: string}> = [] 
    let currentYM: number
    if(month/10 > 1)
        currentYM = year + month/100 
    currentYM = year + month/10

    if(events && events.length !== undefined){
        events.forEach((event: EventType) => {
            let startYM: number
            if(event.start.month/10 > 1)
                startYM = event.start.year + event.start.month/100 
            startYM = event.start.year + event.start.month/10
    
            let endYM: number
            if(event.end.month/10 > 1)
                endYM = event.end.year + event.end.month/100 
            endYM = event.end.year + event.end.month/10
    
            // if(currentYM >= startYM && currentYM <= endYM){ //if current date is between the two
            // }
    
            if(currentYM > startYM && currentYM < endYM){ //all days of current month will be occupied
                for(let i = 1; i <= new Date(year, month, 0).getDate(); i++){
                    const found = eventDays.some((e) => e.day === i && e.eventName === event.eventName)
                    if(!found)
                        eventDays.push({day: i, eventName: event.eventName})
                }
            }
            else if(currentYM === startYM && currentYM === endYM){ //all days of the event are in the current month
                for(let i = event.start.day; i <= event.end.day; i++){
                    const found = eventDays.some((e) => e.day === i && e.eventName === event.eventName)
                    if(!found)
                        eventDays.push({day: i, eventName: event.eventName})
                }
            }
            else if(currentYM > startYM && currentYM === endYM){
                for(let i = 1; i <= event.end.day; i++){
                    const found = eventDays.some((e) => e.day === i && e.eventName === event.eventName)
                    if(!found)
                        eventDays.push({day: i, eventName: event.eventName})
                }
            }
            else if(currentYM === startYM && currentYM < endYM){
                for(let i = event.start.day; i <= new Date(year, month, 0).getDate(); i++){
                    const found = eventDays.some((e) => e.day === i && e.eventName === event.eventName)
                    if(!found)
                        eventDays.push({day: i, eventName: event.eventName})
                }
            }
        })    
    }

    eventDays.sort()
    // console.log(`${month}: ` + JSON.stringify(events) + "\n")
    return eventDays;
})

export const selectSelectedEvent = (state: RootState) => {
    return state.events.selectedEvent
}