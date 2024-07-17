import { ReactElement, useEffect, useState } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { selectIsNotificationSent, selectNewNotifications } from "../../Redux/selectors/NotificationsSelectors"
import styled from "styled-components"
import classes from "./NotificationIndicator.module.css"
import { selectEventLists } from "../../Redux/selectors/EventsSelectors"
import { fetchEventListsTC } from "../../Redux/EventsReducer"
import { clearNewNotificationsAC } from "../../Redux/NotificationsReducer"
import { IndicatorIcon } from "./IndicatorIcon"
import { pickTextColorBasedOnBgColorSimple } from "../../assets"
import { NotificationDescription } from "./NotificationDescription"

export const NotificationIndicator = () => {
    const dispatch = useAppDispatch()

    //state
    const isNotificationSent = useAppSelector((state: RootState) => selectIsNotificationSent(state))
    const newNotificationsList = useAppSelector((state: RootState) => selectNewNotifications(state))
    const eventLists = useAppSelector((state: RootState) => selectEventLists(state))

    //local state
    const [multipleStatus, setMultipleStatus] = useState<"Multiple" | "NonMultiple">(newNotificationsList.length > 1 ? "Multiple" : "NonMultiple")
    const [isPreviewOpened, setIsPreviewOpened] = useState<boolean>(false)

    let indicatorStyle = {}
    let accentColor = ""
    if(multipleStatus === "NonMultiple"){
        if(newNotificationsList[0].type === "Error")
            accentColor = "red"
        else for(let i = 0; i < eventLists.length; i++){
            if(eventLists[i].eventList === newNotificationsList[0].eventList){
                accentColor = eventLists[i].accentColor
                break;
            }
            accentColor = "black"
        }
    }
    else{
        accentColor = "black"
    }
    indicatorStyle = {
        backgroundColor: `${accentColor}`,
        boxShadow: `0cm 0.1cm 0.2cm`,
        color: `${accentColor}`
    }

    useEffect(() => {
        setMultipleStatus(newNotificationsList.length > 1 ? "Multiple" : "NonMultiple")
    }, [newNotificationsList.length])

    let notificationDescriptions: ReactElement[] = []
    if(isPreviewOpened) newNotificationsList.forEach((newNotif) => {
        notificationDescriptions.push(<NotificationDescription type={newNotif.type} eventList={newNotif.eventList} name={newNotif.name} description={newNotif.description} URLs={newNotif.URLs}></NotificationDescription>)
    })

    return (
        isPreviewOpened ?
            <Indicator className={classes["Indicator-Opened"]}>
                <DescriptionsContainer onDoubleClick={() => {}}>
                    {notificationDescriptions}
                </DescriptionsContainer>
            </Indicator>
        :
            <Indicator onDoubleClick={() => {dispatch(clearNewNotificationsAC())}} onClick={() => {setTimeout(() => setIsPreviewOpened(true), 250)}}  onAnimationEnd={(event) => {if(event.animationName.includes("indicatorClosedCloser")) dispatch(clearNewNotificationsAC())}} style={indicatorStyle} className={multipleStatus === "Multiple" ? classes["Indicator-Closed"] : classes["Indicator-Closed"]}>
                <IndicatorIcon type={(multipleStatus === "NonMultiple" && newNotificationsList[0].type === "Error") ? "Error" : "Notifications"} name="dsa"></IndicatorIcon>
                <IndicatorTitle>{multipleStatus === "NonMultiple" ? newNotificationsList[0].name : "new notifications"}</IndicatorTitle>
            </Indicator>

    )
}

const Indicator = styled.div`
`

const IndicatorTitle = styled.div`
    display: inline;
    width: 100%;
    height: fit-content;
    padding-left: 5px;
    text-align: left;
    border-radius: 20px;

    background: inherit;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    filter: invert(1) grayscale(1);
    -webkit-filter: invert(1) grayscale(1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const DescriptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    height: fit-content;
    overflow-y: scroll;
`