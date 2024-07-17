import styled from "styled-components"
import { selectIsNotificationSent } from "../../Redux/selectors/NotificationsSelectors";
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store";
import { ReactElement, useEffect, useState } from "react";
import { NotificationIndicator } from "../notificationIndicator/NotificationIndicator";
import { changeEventsViewerOpenedStatusAC } from "../../Redux/GlobalDataReducer";
import { Button } from "../buttons/switchButton/Button";
import { SendDeleteButton } from "../buttons/switchButton/SendDeleteButton";
import { selectEvents, selectEventsIsFetching } from "../../Redux/selectors/EventsSelectors";
import { EventInfo } from "./EventInfo";
import { EventType, fetchEventsTC } from "../../Redux/EventsReducer";
import { EventInfoSkeleton } from "./EventInfoSkeleton";
import { selectViewType } from "../../Redux/selectors/GlobalSelectors";

type PropsType = {
    isSplitScreen: boolean
}

export const EventsViewer = (props: PropsType) => {
    const dispatch = useAppDispatch()

    //state
    const viewType = useAppSelector((state: RootState) => selectViewType(state))
    const isEventsFetching = useAppSelector((state: RootState) => selectEventsIsFetching(state))
    const isNotificationSent = useAppSelector((state: RootState) => selectIsNotificationSent(state))
    const events = useAppSelector((state: RootState) => selectEvents(state))

    //local state
    const [width, setWidth] = useState(window.innerWidth);
    const [isAllEventsFetched, setIsAllEventsFetched] = useState(false) //initially, current date's events will be displayed. All events need to be fetched separately

    const closeEventsViewer = () => {
        dispatch(changeEventsViewerOpenedStatusAC(false))
    }

    useEffect(() => {
        //used for knowing when to display calendar along with the form (grater than 900px)
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    let eventInfos: Array<ReactElement> = []
    if(!isEventsFetching){
        events.forEach((event) => {
            const eventObject: EventType = {
                _id: event._id,
                eventName: event.eventName,
                eventList: event.eventList,
                start: {...event.start},
                end: {...event.end},
                description: "undefined",
                URLs: null
            }
            eventInfos.push(<EventInfo event={eventObject}></EventInfo>)
        })
    }
    else for(let i = 0; i < 5; i++){
        eventInfos.push(<EventInfoSkeleton/>)
    }

    useEffect(() => {
        dispatch(fetchEventsTC())
    }, [])

    return (
        <EventsViewerContainer viewType={viewType} isSplitScreen={props.isSplitScreen}>
            <EventsViewerTitleBar>
                <div style={{height: "100%", aspectRatio: "1/1"}}></div>
                {/* if width less than 900, then only form is seen. Therefore, display notifications only here */}
                {width < 900 ?
                    <>
                        {!isNotificationSent ? <Title>Events</Title> : <NotificationIndicator/> }
                    </>
                    :
                    <Title>Events</Title>
                }
                <Button buttonType="close" action={closeEventsViewer} color="black" backgroundColor="white" borderColor="black"/>
            </EventsViewerTitleBar>
            <FilterBar>
                <Filters>
                    <FilterButton>Event list</FilterButton>
                    <FilterButton>Date</FilterButton>
                </Filters>
                <SendDeleteButton action="cancel" onClickFunction={() => {}}></SendDeleteButton>
            </FilterBar>
            <Events>
                <EventInfosContainer>
                    {eventInfos}
                </EventInfosContainer>
            </Events>
        </EventsViewerContainer>   
    )
}

const EventsViewerContainer =  styled.div<{viewType: string, isSplitScreen: boolean}>`
    display: flex;
    position: absolute;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between; 
    width: calc(100% - 10px);
    height: calc(100% - 10px);

    overflow-y: scroll;
    top: 0px;
    background-color: black;
    padding: 5px;
    z-index: 200;

    &:hover{
        background-position: 0 -200%;
    }

    @media (min-width: 990px){
        width: ${props => props.viewType === "month" ? "30%" : "calc(100% - 10px)"};
        height: ${props => props.viewType === "month" ? "70%" : "calc(100% - 10px)"};
        position: ${props => props.isSplitScreen ? "relative" : "absolute"};
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
        
        border-radius: ${props => props.isSplitScreen ? "0px" : "10px"};
        box-shadow: ${props => props.isSplitScreen ? "none" : "0cm 0.2cm 0.5cm black"};
    }
`

const EventsViewerTitleBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    //align-items: center;
    position: sticky;
    top: 0;
    width: calc(100% - 20px);
    height: calc(10% - 20px);
    min-height: 30px;

    z-index: 210;
    background-color: white;
    padding: 10px;
    margin-bottom: 10px;
    font-size: var(--titleFont);
    font-weight: 500;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: scroll;
    width: 80%;
    height: 100%;
`

const FilterBar = styled.div`
    display: flex;
    flex-direction:row;
    position: sticky;
    top: 0;
    width: calc(100% - 4px);
    height: calc(8% - 4px);
    min-height: 30px;
    padding: 2px;
    margin-bottom: 10px;

    z-index: 200;
    border-radius: 10px;
    background-color: white;
`

const Filters = styled.div`
    display: flex;
    flex-direction:row;
    gap: 10px;
    width: 100%;
    height: 100%;
    margin-right: 10px;

    overflow-y: scroll;
`

const FilterButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 80px;
    width: fit-content;
    height: 100%;

    border-radius: 10px;
    background-color: black;
    color: white;
`

const Events = styled.div`
    display: block;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`

const EventInfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: fit-content;
    overflow-y: scroll;
`