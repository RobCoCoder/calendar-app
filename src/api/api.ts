import axios from "axios"
import { ValidationError } from "../base"
import { EventListType, EventType } from "../Redux/EventsReducer"

type GetMonthsNamesResponseType = {
    resultCode: number,
    messages?: Array<ValidationError>
    data: {months: Array<string>}
}
type getWeekDaysNamesResponseType = {
    resultCode: number,
    messages?: Array<ValidationError>,
    data: {weekDays: Array<string>}
}

export type NavigationTitlesLanguageType = {
    viewSwitch: string,
    createEvent: string,
    createList: string
}
type GetNavigationTitlesResponseType = {
    resultCode: number,
    messages?: Array<ValidationError>,
    data: {
        navigationTitles: NavigationTitlesLanguageType
    }
}

type checkSearchFormResponseType = {
    resultCode: number,
    messages?: Array<ValidationError>,
    data: {monthIndex: number} //0-11
}

type GetEventListsResponseType = {
    resultCode: number,
    messages?: Array<ValidationError>,
    data: {
        eventLists: Array<EventListType>
    } 
}

type PostEventListResponseType = {
    resultCode: number,
    messages?: Array<ValidationError>,
    data: {
        eventList: EventListType
    } 
}

type ColorType = {
    name: string,
    colorCode: string
}
export type EventListColorNamesType = {
    red: ColorType,
    blanchedalmond: ColorType,
    blue: ColorType,
    orange: ColorType,
    purple: ColorType
}
type GetEventListColorsNamesResponseType = {
    resultCode: number,
    messages?: Array<ValidationError>,
    data: {
        eventListColorNames: EventListColorNamesType
    } 
}

export type GetEventsResponseType = {
    resultCode: number,
    messages?: Array<ValidationError>,
    data: {events: Array<EventType>} 
}

export type PostPutEventResponseType = {
    resultCode: number,
    messages?: Array<ValidationError>,
    data: {event: EventType} 
}

export type DeleteEventResponseType = {
    resultCode: number,
    messages?: Array<ValidationError>,
    data: {} 
}

const instance = axios.create({
    withCredentials: true
})

export const languagesAPI = {
    async getMonthsNames(lang: "en" | "ru" | "fr"){
        const response = await instance.get<GetMonthsNamesResponseType>(`http://192.168.2.14:5001/languages/months?lang=${lang}`)
        return response.data
    },
    async getWeekDaysNames(lang: "en" | "fr" | "ru"){
        const response = await instance.get<getWeekDaysNamesResponseType>(`http://192.168.2.14:5001/languages/weekdays?lang=${lang}`)
        return response.data
    },
    async getNavigationTitles(lang: "en" | "fr" | "ru"){
        const response = await instance.get<GetNavigationTitlesResponseType>(`http://192.168.2.14:5001/languages/navigationTitles?lang=${lang}`)
        return response.data
    },
    async getEventListColorNames(lang: "en" | "fr" |"ru"){
        const response = await instance.get<GetEventListColorsNamesResponseType>(`http://192.168.2.14:5001/languages/eventListColorNames?lang=${lang}`)
        return response.data
    }
}

export const searchFormAPI = {
    async checkSearchForm(lang: string, year: number, monthName?: string, dayOfTheMonth?: number){
        const response = await instance.post<checkSearchFormResponseType>("http://192.168.2.14:5001/searchForm", 
        JSON.stringify({
            lang: lang,
            year: year,
            monthName: monthName,
            dayOfTheMonth: dayOfTheMonth
        }), 
        {
            headers: 
            {
                "Content-Type": "application/json"
            }
        })
        return response.data
    }
}

export const eventsAPI = {
    async getEventLists(){
        const response = await instance.get<GetEventListsResponseType>(`http://192.168.2.14:5001/eventLists/`)
        return response.data
    },
    async createEventList(eventList: string, accentColor: string){
        const response = await instance.post<PostEventListResponseType>('http://localhost:5001/eventLists/', JSON.stringify({
            eventList: eventList,
            accentColor: accentColor
        }), 
        {headers: {"Content-Type": "application/json"}})
        return response.data
    },
    async getEventsOfMonth(year: number, month: number){
        const response = await instance.get<GetEventsResponseType>(`http://192.168.2.14:5001/events/${year}/${month}`) //give all the events that happen on the given interval
        return response.data
    },
    async getEventsOfDay(year: number, month: number, day: number){
        const response = await instance.get<GetEventsResponseType>(`http://192.168.2.14:5001/events/${year}/${month}/${day}`) //give all the events that happen on the given interval
        return response.data
    },
    async getEvents(){
        const response = await instance.get<GetEventsResponseType>(`http://192.168.2.14:5001/events/`) //give all the events
        return response.data
    },
    async createEvent(eventList: string, eventName: string, start: {year: number, month: number, day: number, hour: number, minute: number}, end: {year: number, month: number, day: number, hour: number, minute: number}){
        const response = await instance.post<PostPutEventResponseType>(`http://192.168.2.14:5001/events/`, JSON.stringify({
            eventName: eventName,
            eventList: eventList,
            start: {
                year: start.year,
                month: start.month,
                day: start.day,
                hour: start.hour,
                minute: start.minute
            },
            end: {
                year: end.year,
                month: end.month,
                day: end.day,
                hour: end.hour,
                minute: end.minute
            }
        }), {headers: {"Content-Type": "application/json"}})
        return response.data
    },
    async updateEvent(_id: string, eventList: string, eventName: string, start: {year: number, month: number, day: number, hour: number, minute: number}, end: {year: number, month: number, day: number, hour: number, minute: number}){
        debugger
        const response = await instance.put<PostPutEventResponseType>(`http://192.168.2.14:5001/events/`, JSON.stringify({
            _id: _id,
            eventName: eventName,
            eventList: eventList,
            start: {
                year: start.year,
                month: start.month,
                day: start.day,
                hour: start.hour,
                minute: start.minute
            },
            end: {
                year: end.year,
                month: end.month,
                day: end.day,
                hour: end.hour,
                minute: end.minute
            }
        }), {headers: {"Content-Type": "application/json"}})
        return response.data
    },
    async deleteEvent(_id: string){
        const response = await instance.delete<DeleteEventResponseType>(`http://192.168.2.14:5001/events/`, {data: JSON.stringify({_id: _id}), headers: {"Content-Type": "application/json"}})
        return response.data
    }
}