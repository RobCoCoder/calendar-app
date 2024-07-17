import styled, { keyframes } from "styled-components"
import { Button } from "../buttons/switchButton/Button"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { EventUpserterForm } from "./EventUpserterForm"
import { selectEventLists, selectSelectedEvent } from "../../Redux/selectors/EventsSelectors"
import { useEffect, useState } from "react"
import { SubmitButton } from "../buttons/switchButton/SubmitButton"
import { selectIsNotificationSent } from "../../Redux/selectors/NotificationsSelectors"
import { NotificationIndicator } from "../notificationIndicator/NotificationIndicator"
import { changeEventUpserterOpenedStatusAC } from "../../Redux/GlobalDataReducer"
import { EventType } from "../../Redux/EventsReducer"
import { selectViewType } from "../../Redux/selectors/GlobalSelectors"

type PropsType = {
    isSplitScreen: boolean
}

export const EventUpserter = (props: PropsType) => {
    const dispatch = useAppDispatch()

    //state
    const viewType = useAppSelector((state: RootState) => selectViewType(state))
    const isNotificationSent = useAppSelector((state: RootState) => selectIsNotificationSent(state))
    const eventLists = useAppSelector((state: RootState) => selectEventLists(state))
    const selectedEvent = useAppSelector((state: RootState) => selectSelectedEvent(state))

    //local state
    const [width, setWidth] = useState(window.innerWidth);
    const [backgroundDropperColor, setBackgroundDropperColor] = useState<null | string>(null)

    //dispatch
    const closeEventCreator = () => {
        dispatch(changeEventUpserterOpenedStatusAC(false))
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
    
    return (
        <EventCreatorContainer viewType={viewType} isSplitScreen={props.isSplitScreen}>
            {backgroundDropperColor && <BackgroundDropper backgroundColor={backgroundDropperColor}></BackgroundDropper>}
            <EventCreatorTitleBar>
                <SubmitButton buttonType="add_circle" formName="eventUpserterForm" backgroundColor="white" color="black" borderColor="black"/>
                {/* if width less than 900, then only form is seen. Therefore, display notifications only here */}
                {width < 900 ?
                    <>
                        {!isNotificationSent ? <Title>{selectedEvent ? "Edit event" : "Create event"}</Title> : <NotificationIndicator/> }
                    </>
                    :
                    <Title>{selectedEvent ? "Edit event" : "Create event"}</Title>
                }
                <Button buttonType="close" action={closeEventCreator} color="black" backgroundColor="white" borderColor="black"/>
            </EventCreatorTitleBar>
            <EventUpserterForm event={selectedEvent} backgroundDropperColor={backgroundDropperColor} setBackgroundDropperColor={setBackgroundDropperColor}></EventUpserterForm>
        </EventCreatorContainer>
    )
}

const EventCreatorContainer = styled.div<{viewType: string, isSplitScreen: boolean}>`
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

const backgroundDroppingAnimation = keyframes`
    0% {
        width: calc(100% - 10px);
        height: 5%;
        top: 5%;
        border-radius: 10px;
    },
    90% {
        width: calc(100% - 10px);
        height: calc(95% - 10px);
        top: 5%;
        border-radius: 10px;
    },
    100% {
        width: calc(100% - 10px);
        height: calc(95% - 10px);
        top: 5%;
        bottom: 5px;
        border-radius: 10px;
    }
`

const BackgroundDropper = styled.div<{backgroundColor: string}>`
    display: block;
    position: absolute;
    width: calc(100% - 10px);
    height: 5%;

    top: 5%;
    bottom: 5px;
    border-radius: 10px;
    background-color: ${props => !props.backgroundColor ? "transparent" : props.backgroundColor};
    animation-name: ${backgroundDroppingAnimation};
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
`

const EventCreatorTitleBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    //align-items: center;
    position: sticky;
    top: 0;
    width: calc(100% - 20px);
    height: calc(10% - 20px);
    min-height: 30px;

    z-index: 400;
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

