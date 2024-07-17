import styled from "styled-components"

type PropsType = {
    type: "Notifications" | "Error"
    name: string
}

export const IndicatorIcon = (props: PropsType) => {
    return (
        <IconContainer>
            <Span className="material-symbols-outlined">{props.type === "Error" ? "error" : "notifications_active"}</Span>
        </IconContainer>
    )
}

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    aspect-ratio: 1/1;
    border-radius: 100%;
`

const Span = styled.span`
    border-radius: 100%;
    background: inherit;
    background-clip: text;
    -webkit-background-clip: text;
    color: red;
    filter: invert(1) grayscale(1);
    -webkit-filter: invert(1) grayscale(1);
`