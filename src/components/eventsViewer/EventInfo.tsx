import styled from "styled-components"
import { selectEventLists } from "../../Redux/selectors/EventsSelectors"
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/Store"
import { selectMonths } from "../../Redux/selectors/LanguageSelectors"
import { ReactElement, useState } from "react"
import { changeEventUpserterOpenedStatusAC, changeEventsViewerOpenedStatusAC } from "../../Redux/GlobalDataReducer"
import { EventType, deleteEventTC, setSelectedEventAC } from "../../Redux/EventsReducer"

type PropsType = {
    event: EventType 
}

export const EventInfo = (props: PropsType) => {
    const dispatch = useAppDispatch()

    //state
    const eventLists = useAppSelector((state: RootState) => selectEventLists(state))
    const months = useAppSelector((state: RootState) => selectMonths(state))

    //localState 
    const [isEventGettingDeleted, setIsEventGettingDeleted] = useState(false)
    const [isNotifcationDescriptionEnlarged, setisNotifcationDescriptionEnlarged] = useState<boolean>(false)
    const [isNotificationLinksEnlarged, setIsNotificationLinksEnlarged] = useState<boolean>(false)

    const enlargeDelargeNotificationDescription = () => {
        setisNotifcationDescriptionEnlarged(!isNotifcationDescriptionEnlarged)
    }

    const enlargeDelargeNotificationLinks = () => {
        // if(props.URLs && props.URLs.length > 4)
        setIsNotificationLinksEnlarged(!isNotificationLinksEnlarged)
    }

    const openEventUpserter = () => {
        dispatch(changeEventsViewerOpenedStatusAC(false))
        dispatch(setSelectedEventAC(props.event))
        dispatch(changeEventUpserterOpenedStatusAC(true))
    }

    const deleteEvent = async() => {
        setIsEventGettingDeleted(true)
        await dispatch(deleteEventTC(props.event._id))
        setIsEventGettingDeleted(false)
    }

    let accentColor = "black"
    for(let i = 0; i < eventLists.length; i++){
        if(eventLists[i].eventList === props.event.eventList){
            accentColor = eventLists[i].accentColor
            break
        }
    }

    let links: Array<ReactElement> = []
    // if(props.URLs && props.URLs.length !== 0) 
    //     for(let i = 0; i < props.URLs.length; i++){
    //     const domain: string = new URL(props.URLs[i]).hostname;  
    //     const domain: string = props.URLs[i];  
    //     links.push(<Link href={props.URLs[i]} title={props.URLs[i]}>{domain}</Link>)
        // if(i === props.URLs.length-1 && props.URLs.length > 4)
        //     links.push(
        //         <LinksEnlargerContainer>
        //             <LinksEnlarger onClick={enlargeDelargeNotificationLinks} style={notifDescriptionStyle}>
        //                 <span className="material-symbols-outlined">arrow_drop_up</span>
        //             </LinksEnlarger>
        //         </LinksEnlargerContainer>
        //     )

        // if(isNotificationLinksEnlarged) continue
        // if(i === 3 && props.URLs.length > 4) {
        //     links.push(
        //         <LinksEnlargerContainer>
        //             <LinksEnlarger onClick={enlargeDelargeNotificationLinks}style={notifDescriptionStyle}>
        //                 <Span className="material-symbols-outlined">arrow_drop_down</Span>
        //             </LinksEnlarger>
        //         </LinksEnlargerContainer>
        //     )
        //     break
    // }
    // }

    for(let i = 0; i < 6; i++){
        // const domain: string = new URL("https://www.youtube.com/watch?v=WpTQy8nLs6A").hostname;  
        const domain: string = "https://www.youtube.com/watch?v=WpTQy8nLs6Ahttps://www.youtube.com/watch?v=WpTQy8nLs6A";  
        links.push(<Link href={"https://www.youtube.com/watch?v=WpTQy8nLs6A"} title={"https://www.youtube.com/watch?v=WpTQy8nLs6A"}>{domain}</Link>)
        if(i === 6-1 && 6 > 4)
            links.push(
                <LinksEnlargerContainer>
                    <LinksEnlarger onClick={enlargeDelargeNotificationLinks} style={{backgroundColor: accentColor}}>
                        <span className="material-symbols-outlined">arrow_drop_up</span>
                    </LinksEnlarger>
                </LinksEnlargerContainer>
            )

        if(isNotificationLinksEnlarged) continue
        if(i === 3 && 6 > 4) {
            links.push(
                <LinksEnlargerContainer>
                    <LinksEnlarger onClick={enlargeDelargeNotificationLinks}style={{backgroundColor: accentColor}}>
                        <Span className="material-symbols-outlined">arrow_drop_down</Span>
                    </LinksEnlarger>
                </LinksEnlargerContainer>
            )
            break
        }
    }

    return (
        <EventInfoContainer backgroundColor={accentColor}>
            <TitleBar>
                <Title>
                    <EventListTitle title={props.event.eventList}>{props.event.eventList} - </EventListTitle>
                    {/* <EventNameTitle>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at posuere felis, quis pretium urna. Integer ornare vulputate rhoncus. In hac habitasse platea dictumst. Mauris mattis eros sapien, id pellentesque nulla commodo vel. Cras et auctor arcu, vitae blandit tortor. Proin ex lectus, congue at imperdiet in, rutrum sit amet quam. In ipsum metus, tempus at lectus non, gravida facilisis ligula.</EventNameTitle> */}
                    <EventNameTitle title={props.event.eventName}>{props.event.eventName}</EventNameTitle>
                </Title>
                <ActionsContainer>
                    <EditButton onClick={openEventUpserter}>
                        <span className="material-symbols-outlined">edit</span>
                    </EditButton>
                    <DeleteButton disabled={isEventGettingDeleted} onClick={() => deleteEvent}>
                        <span className="material-symbols-outlined">delete</span>
                    </DeleteButton>
                </ActionsContainer>
            </TitleBar>
            <StartEndInfoContainer>
                <StartEndInfo>
                    Event starts at {props.event.start.year}, {months[props.event.start.month-1].value}, {props.event.start.day}, at {props.event.start.hour}:{props.event.start.minute}
                </StartEndInfo>
                <StartEndInfo>
                    Event ends at {props.event.end.year}, {months[props.event.end.month-1].value}, {props.event.end.day}, at {props.event.end.hour}:{props.event.end.minute}
                </StartEndInfo>
            </StartEndInfoContainer>
            {props.event.description !== "" && <Description isNotifcationDescriptionEnlarged={isNotifcationDescriptionEnlarged} onDoubleClick={() => enlargeDelargeNotificationDescription()}>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at posuere felis, quis pretium urna. Integer ornare vulputate rhoncus. In hac habitasse platea dictumst. Mauris mattis eros sapien, id pellentesque nulla commodo vel. Cras et auctor arcu, vitae blandit tortor. Proin ex lectus, congue at imperdiet in, rutrum sit amet quam. In ipsum metus, tempus at lectus non, gravida facilisis ligula</Description>}
            {/* {(props.URLs && props.URLs.length !== 0) && <Links>a</Links>} */}
            <Links>{links}</Links>
        </EventInfoContainer>
    )
}

const EventInfoContainer = styled.div<{backgroundColor: string}>`
    display: flex; 
    flex-direction: column;
    width: calc(95% - 10px);
    height: fit-content;
    background-color: ${props => props.backgroundColor};
    border-radius: 20px;
    padding: 5px;
`

const TitleBar = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    height: 30px;
`

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;

    // background: inherit;
    // background-clip: text;
    // -webkit-background-clip: text;
    // color: red;
    // filter: invert(1) grayscale(1);
    // -webkit-filter: invert(1) grayscale(1);
`

const EventListTitle = styled.div`
    display: block;
    justify-content: left;
    align-items: center;
    padding: 2px;
    width: fit-content;
    max-width: calc(50%);
    height: fit-content;

    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: var(--defaultFont);
    font-weight: 600;
`

const EventNameTitle = styled.div`
    display: block;
    justify-content: left;
    align-items: center;
    padding: 2px;
    width: calc(50%);
    height: fit-content;

    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: var(--defaultFont);
    font-weight: 600;
`

const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 50%;
    height: 100%;
`

const EditButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    max-width: 60px;
    height: 90%;

    border: 0.01cm solid black;
    border-radius: 50px;
    background-color: black;
    color: white;
`

const DeleteButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    max-width: 60px;
    height: 90%;

    border: 0.01cm solid black;
    border-radius: 50px;
    background-color: black;
    color: white;
`

const StartEndInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 8px);
    height: fit-content;
    margin: 2px;
    padding: 2px;

    background-color: #ffffff;
    border-radius: 10px;
`

const StartEndInfo = styled.div`
    display: block;
    position: relative;
    widht: 100%;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;

    &::before {
        content: "•";
    }
`

const Description = styled.div<{isNotifcationDescriptionEnlarged: boolean}>`
    display: -webkit-box;
    position: relative;
    widht: 100%;
    height: fit-content;
    margin: 2px;
    padding: 2px;

    border-radius: 10px;
    background-color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props => props.isNotifcationDescriptionEnlarged === true ? "0" : "2"};
    word-wrap: break-word;
`

const Links = styled.div`
    display: block;
    list-style-type: disc;
    position: relative;
    widht: 100%;
    height: 100%;
    margin: 2px;
    padding: 2px;

    background-color: #ffffff;
    border-radius: 10px;
`

const Link = styled.a`
    display: block;
    width: calc(100%);
    height: fit-content;
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: black;
    &::before {
        content: "•";
    }
`

const LinksEnlargerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-top: 10px;
`

const LinksEnlarger = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    max-width: 60px;
    height: 90%;

    border: 0.01cm solid black;
    border-radius: 50px;
`

const Span = styled.div`
    background-clip: text;
    -webkit-background-clip: text;
    color: red;
    filter: invert(1) grayscale(1);
    -webkit-filter: invert(1) grayscale(1);
`