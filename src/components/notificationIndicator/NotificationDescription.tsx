import styled from "styled-components"
import { RootState, useAppSelector } from "../../Redux/Store"
import { selectEventLists } from "../../Redux/selectors/EventsSelectors"
import { ReactElement, useState } from "react"

type PropsType = {
    type: "Error" | "Event",
    eventList: string | null, //null when type is "Error", otherwise it cant be null
    name: string,
    description: string,
    URLs: Array<string> | null
}
export const NotificationDescription = (props: PropsType) => {

    //state
    const eventLists = useAppSelector((state: RootState) => selectEventLists(state))

    //localState 
    const [isNotifcationDescriptionEnlarged, setisNotifcationDescriptionEnlarged] = useState<boolean>(false)
    const [isNotificationLinksEnlarged, setIsNotificationLinksEnlarged] = useState<boolean>(false)

    const enlargeDelargeNotificationDescription = () => {
        setisNotifcationDescriptionEnlarged(!isNotifcationDescriptionEnlarged)
    }

    const enlargeDelargeNotificationLinks = () => {
        if(props.URLs && props.URLs.length > 4)
            setIsNotificationLinksEnlarged(!isNotificationLinksEnlarged)
    }

    let notifDescriptionStyle = {}
    let accentColor
    if(props.type === "Error")
        accentColor = "#FF0000"
    else for(let i = 0; i < eventLists.length; i++){
        if(eventLists[i].eventList === props.eventList){
            accentColor = eventLists[i].accentColor
            break
        }
    }
    notifDescriptionStyle = {
        backgroundColor: `${accentColor}`,
    }

    const links: Array<ReactElement> = []
    if(props.URLs && props.URLs.length !== 0) for(let i = 0; i < props.URLs.length; i++){
        const domain: string = new URL(props.URLs[i]).hostname;  
        // const domain: string = props.URLs[i];  
        links.push(<Link href={props.URLs[i]} title={props.URLs[i]}>{domain}</Link>)
        if(i === props.URLs.length-1 && props.URLs.length > 4)
            links.push(
                <LinksEnlargerContainer>
                    <LinksEnlarger onClick={enlargeDelargeNotificationLinks} style={notifDescriptionStyle}>
                        <span className="material-symbols-outlined">arrow_drop_up</span>
                    </LinksEnlarger>
                </LinksEnlargerContainer>
            )

        if(isNotificationLinksEnlarged) continue
        if(i === 3 && props.URLs.length > 4) {
            links.push(
                <LinksEnlargerContainer>
                    <LinksEnlarger onClick={enlargeDelargeNotificationLinks}style={notifDescriptionStyle}>
                        <Span className="material-symbols-outlined">arrow_drop_down</Span>
                    </LinksEnlarger>
                </LinksEnlargerContainer>
            )
            break
        }
    }

    return (
        <NotificationDescriptionContainer style={notifDescriptionStyle}>
            <Title style={notifDescriptionStyle}><p style={{WebkitBackgroundClip: "text", color: "red", filter: "invert(1) grayscale(1)", WebkitFilter: "invert(1) grayscale(1)"}}>{props.name}</p></Title>
            {props.description !== "" && <Description isNotifcationDescriptionEnlarged={isNotifcationDescriptionEnlarged} onDoubleClick={() => enlargeDelargeNotificationDescription()}>{"Description: " + props.description}</Description>}
            {props.URLs && props.URLs.length !== 0 && <Links><p>Links:</p>{links}</Links>}
        </NotificationDescriptionContainer>
    )
}

const NotificationDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-height: fit-content;

    border-radius: 10px;
`

const Title = styled.div`
    display: block;
    width: 100%;
    height: fit-content;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 0.01cm solid black;
`

const Description = styled.div<{isNotifcationDescriptionEnlarged: boolean}>`
    display: -webkit-box;
    position: relative;
    widht: 100%;
    background-color: #ffffff;
    margin: 2px;
    padding: 2px;
    border-radius: 10px;
    height: fit-content;

    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props => props.isNotifcationDescriptionEnlarged === true ? "0" : "4"};
    word-wrap: break-word;
`

const Links = styled.ul`
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