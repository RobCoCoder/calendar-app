import styled from "styled-components"

type PropsType = {
    width: number
    weekDayName: string
}

export const WeekDayCell = (props: PropsType) => {
    return (
        <WeekDayCellContainer>
            {props.width < 850 ? <p>{props.weekDayName.substring(0, 3)}</p> : <p>{props.weekDayName}</p>} 
        </WeekDayCellContainer>
    )
}

const WeekDayCellContainer = styled.div`
    display: block;
    width: 10%; 
    text-align: center;
    font-size: var(--defaultFont);
`