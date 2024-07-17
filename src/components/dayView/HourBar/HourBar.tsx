import styled from "styled-components"

type PropsType = {
    hour: number
}

export const HourBar = (props: PropsType) => {
    return (
        <HourBarContainer>
            <HourIndicator>{props.hour + ":00"}</HourIndicator>
            {/* <UnderlineBar></UnderlineBar> */}
        </HourBarContainer>
    )
}

const HourBarContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: top;
    width: 100%;
    border-top: 0.01cm solid white;
    height: calc(100%/24);

    @media (max-height: 600px) {
        height: calc(1000px/24);
    }
`

const HourIndicator = styled.div`
    display: inline-block;
    width: 100%;
    color: white;
    font-size: var(--defaultFont);
`

const UnderlineBar = styled.div`
    display: block;
    position: relative;
    width: calc(100% - 10px); //10px: right padding,  
    height: 1%;
    border-top: 0.1cm solid white;
`